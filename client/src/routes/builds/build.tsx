import { buildsApi } from "@apis/hooks/useBuild";
import { useParams } from "react-router";

export const Build = () => {
  const params = useParams();
  const { data, isSuccess } = buildsApi.useFindBuild(params.buildId!);
  const metrics = data?.resultMetrics;
  return isSuccess ? (
    <div>
      <div>{metrics?.buildTime} ms</div>
      <div>{metrics?.bundleSize}</div>
    </div>
  ) : null;
};
