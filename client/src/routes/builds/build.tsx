import { buildsApi } from "@apis/hooks/useBuild";
import { formatFileSize } from "@utils/formatFileSize";
import { moduleNameExtractor } from "@utils/moduleNameExtracter";
import { useParams } from "react-router";

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
      <div className="max-w-3xl w-full">
        {metrics?.plugins.map((plugin) => (
          <div
            key={plugin.name}
            className="flex items-center justify-between text-sm w-full"
          >
            <h1 className="flex-[0.4] text-ellipsis truncate">
              {moduleNameExtractor(plugin.name)}
            </h1>
            <div className="flex-[0.2]">{(+plugin.time).toFixed(2)} ms</div>
            <div className="flex-[0.2]">{formatFileSize(plugin.size)}</div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
