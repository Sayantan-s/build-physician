import { Compiler } from "webpack";
import "colorts/lib/string";
import { BuildMetrics, PLUGIN_NAME, TimedModule, IResults } from "./type";
import { builds } from "../api";

export class BuildPhysician {
  private metrics: BuildMetrics;
  private results: IResults;
  private pluginName = PLUGIN_NAME;

  constructor() {
    this.metrics = {};
    this.results = {};
  }

  apply(compiler: Compiler) {
    this.generateDependencyGraph(compiler);
    this.generateLoadTimeMetrics(compiler);
    this.createBuildRecord(compiler);
  }

  private generateLoadTimeMetrics(compiler: Compiler) {
    this.metrics.plugins = [];
    const pluginTimes = new Map();
    // Compute build start time
    compiler.hooks.compile.tap(this.pluginName, () => {
      this.metrics.startTime = process.hrtime();
    });

    // Compute plugin execution time
    compiler.hooks.beforeRun.tapAsync(this.pluginName, (compiler, callback) => {
      compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
        compilation.hooks.buildModule.tap(
          this.pluginName,
          (module: TimedModule) => {
            module.startTime = process.hrtime();
          }
        );

        compilation.hooks.succeedModule.tap(
          this.pluginName,
          (module: TimedModule) => {
            const diff = process.hrtime(module.startTime);
            const timeMs = diff[0] * 1000 + diff[1] / 1e6;
            pluginTimes.set(module.identifier() || "unknown", timeMs);
          }
        );
      });

      callback();
    });

    compiler.hooks.done.tap(this.pluginName, () => {
      this.metrics.plugins = Array.from(pluginTimes.entries()).map(
        ([name, time]) => ({
          name,
          time: time.toFixed(2),
        })
      );
    });

    // Compute loader execution time
    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.buildModule.tap(
        this.pluginName,
        (module: TimedModule) => {
          module.startTime = process.hrtime();
        }
      );

      compilation.hooks.succeedModule.tap(
        this.pluginName,
        (module: TimedModule) => {
          if (module.loaders.length) {
            const diff = process.hrtime(module.startTime);
            const timeMs = diff[0] * 1000 + diff[1] / 1e6;
            module.loadTime = timeMs;
          }
        }
      );
    });

    // Compute overall build time
    compiler.hooks.done.tap(this.pluginName, (stats) => {
      const diff = process.hrtime(this.metrics.startTime);
      this.metrics.totalBuildTime = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
      this.metrics.bundleSize =
        stats
          .toJson()
          .assets?.reduce((sum, asset) => sum + (asset.size || 0), 0) || 0;

      const buildData = {
        buildTime: this.metrics.totalBuildTime,
        bundleSize: this.metrics.bundleSize,
        plugins: this.metrics.plugins,
      };
      this.results.resultMetrics = buildData;
      console.log("Overall build time".red);
    });
  }

  private generateDependencyGraph(compiler: Compiler) {
    compiler.hooks.done.tap(this.pluginName, (stats) => {
      const compilationStats = stats.toJson();
      const nodes = compilationStats.modules.map((mod) => ({
        id: mod.id,
        name: mod.name,
        size: mod.size,
      }));

      const edges = compilationStats.modules.flatMap((mod) =>
        (mod.reasons || []).map((reason) => ({
          source: reason.moduleId,
          target: mod.id,
        }))
      );

      const data = { nodes, edges };
      this.results.depGraphMetrics = data;
      console.log("Depgraph metric time".yellow);
    });
  }

  private createBuildRecord(compiler: Compiler) {
    compiler.hooks.done.tapAsync(this.pluginName, async () => {
      console.log(":: Creating Build Instance".yellow);
      const { data: buildId } = await builds.post<string>("/", this.results);
      console.log(":: Build Instance Created!".green);

      const _genLink = `abc.vercel.app/${buildId}`.red.underline.red;
      const _genLinkPreffix = "Check your bundle's insights at:: ".gray;
      const _genLinkText = _genLinkPreffix.concat(_genLink);
      console.log(_genLinkText);
    });
  }
}
