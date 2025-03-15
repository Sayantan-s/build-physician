import { getBuildData } from "@apis/http/endpoints/builds";
import { useDepGraphToolStore } from "@store/build";
import { IBuild } from "@store/build/types";
import { useQuery } from "@tanstack/react-query";

export const GET_BUILD_BY_ID = "GET_BUILD_BY_ID" as const;

const useFindBuild = (buildId: string) => {
  const { setDepGraph } = useDepGraphToolStore();

  return useQuery<IBuild>({
    queryKey: [GET_BUILD_BY_ID, buildId],
    queryFn: async () => {
      const data = await getBuildData(buildId);
      setDepGraph(
        data.data.depGraphMetrics.nodes,
        data.data.depGraphMetrics.edges
      );
      return data.data;
    },
  });
};

export const buildsApi = { useFindBuild };
