import { buildsApi } from "@apis/hooks/useBuild";
import { useParams } from "react-router";

const moduleNameExtractor = (moduleName: string) => {
  const brokenDownPaths = moduleName.split("/");
  return brokenDownPaths[brokenDownPaths.length - 1];
};

export const Build = () => {
  const params = useParams();
  const { data, isSuccess } = buildsApi.useFindBuild(params.buildId!);
  const metrics = data?.resultMetrics;
  return isSuccess ? (
    <div>
      <div>
        <div>{metrics?.buildTime} ms</div>
        <div>{metrics?.bundleSize}</div>
        <div>{metrics?.hmrTime}</div>
      </div>
      <div className="max-w-xl w-full">
        {metrics?.plugins.map((plugin) => (
          <div
            key={plugin.name}
            className="flex items-center justify-between text-sm w-full"
          >
            <h1>{moduleNameExtractor(plugin.name)}</h1>
            <div>{plugin.time}</div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
