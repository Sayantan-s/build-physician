import { getBuildData } from "@apis/http/endpoints/builds";
import { IBuild } from "@store/auth/types";
import { useQuery } from "@tanstack/react-query";

export const GET_BUILD_BY_ID = "GET_BUILD_BY_ID" as const;

const useFindBuild = (buildId: string) => {
  return useQuery<IBuild>({
    queryKey: [GET_BUILD_BY_ID, buildId],
    queryFn: async () => {
      const data = await getBuildData(buildId);
      return data.data;
    },
  });
};

export const buildsApi = { useFindBuild };
