import { Compiler } from "webpack";
import "colorts/lib/string";
import {
  BuildMetrics,
  PLUGIN_NAME,
  TimedModule,
  IResults,
  IConstructor,
} from "./type";
import { builds } from "../api";
import { Logger } from "../utils/log";
import path from "path";

export class BuildPhysician {
  private metrics: BuildMetrics;
  private results: IResults;
  private config: IConstructor | null;
  private pluginName = PLUGIN_NAME;

  constructor(config: IConstructor | void) {
    this.metrics = {};
    this.results = {};
    if (config && !config.projectId)
      throw new Error("projectId is not mentioned!");
    this.config = config || null;
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
            const identifierName = module.identifier() || "unknown";

            const ext = path.extname(identifierName);

            let type = "unknown";
            if (ext.match(/\.js|\.jsx|\.ts|\.tsx/)) type = "script";
            else if (ext.match(/\.css|\.scss|\.less/)) type = "style";
            else if (ext.match(/\.png|\.jpg|\.jpeg|\.gif|\.svg/))
              type = "image";
            else if (ext.match(/\.html/)) type = "html";
            else if (ext.match(/\.json/)) type = "json";

            pluginTimes.set(identifierName, {
              time: timeMs,
              size: module.size(),
              type,
              extension: ext,
            });
          }
        );
      });

      callback();
    });

    compiler.hooks.done.tap(this.pluginName, () => {
      this.metrics.plugins = Array.from(pluginTimes.entries()).map(
        ([name, metaData]) => ({
          name,
          ...metaData,
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
      Logger.info("🔥 Build time", `${this.metrics.totalBuildTime} ms`);
    });

    // Track Hot Module Replacement (HMR) time
    compiler.hooks.invalid.tap(this.pluginName, () => {
      this.metrics.startTime = process.hrtime();
    });

    compiler.hooks.done.tap(this.pluginName, () => {
      if (this.metrics.startTime) {
        const diff = process.hrtime(this.metrics.startTime);
        this.metrics.hmrTime = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
        this.results.resultMetrics.hmrTime = this.metrics.hmrTime;
        Logger.info("🔥 HMR Update Time", `${this.metrics.hmrTime} ms`);
      }
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
      Logger.info("🔥 Depgraph created");
    });
  }

  private createBuildRecord(compiler: Compiler) {
    compiler.hooks.done.tapAsync(this.pluginName, async () => {
      const data = {
        ...this.results,
        projectId: this.config.projectId,
      };
      const { data: buildId } = await builds.post<string>("/", data);
      Logger.info("Build Instance Created!".green);
      const _genLink =
        `https://slot-in-k3d3.vercel.app/projects/${this.config.projectId}/builds/${buildId}`
          .red.underline.red;
      const _genLinkPreffix = "Check your bundle's insights at:: ".gray;
      Logger.info(_genLinkPreffix, _genLink);
      this.config?.emitOnBuildCompete?.({ ...this.results, buildId });
    });
  }
}
