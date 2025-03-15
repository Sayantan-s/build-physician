import { buildsApi } from "@apis/hooks/useBuild";
import { TECHSTACK_ICONS } from "@components/icons";
import { Doc } from "@components/icons/doc";
import { DepGraphViz } from "@components/routes/build/DepGraphViz";
import { formatFileSize } from "@utils/formatFileSize";
import { moduleNameExtractor } from "@utils/moduleNameExtracter";
import { useParams } from "react-router";

export const Build = () => {
  const params = useParams();
  const { data, isSuccess } = buildsApi.useFindBuild(params.buildId!);
  const metrics = data?.resultMetrics;

  return isSuccess ? (
    <main className="max-w-[1600px] mx-auto p-4">
      <DepGraphViz />
      <div className="flex-[0.5]">
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
              {TECHSTACK_ICONS[plugin.extension] || <Doc width={24} />}
              <h1 className="flex-[0.4] text-ellipsis truncate">
                {moduleNameExtractor(plugin.name)}
              </h1>
              <div className="flex-[0.2]">{(+plugin.time).toFixed(2)} ms</div>
              <div className="flex-[0.2]">{formatFileSize(plugin.size)}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  ) : null;
};
