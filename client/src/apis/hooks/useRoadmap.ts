import {
  QueryOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  IRoadmap,
  IRoadmapResponse,
  IRoadmapSchema,
  Roadmap,
} from "@apis/http/endpoints/roadmap";
import { useNavigate } from "@tanstack/react-router";
import { useBuilderToolStore } from "@store/buildertool";

export const ROADMAP_CREATE = "ROADMAP_CREATE_KEY" as const;
export const ROADMAP_FETCH = "ROADMAP_FETCH" as const;
export const ROADMAP_FETCH_ALL = "ROADMAP_FETCH_ALL" as const;
export const ROADMAP_UPDATE = "ROADMAP_UPDATE" as const;

export interface IUseCreateRoadmapOptions {
  redirect?: boolean;
}

export interface IUseFetchRoadmapOptions
  extends Omit<UseQueryOptions<IRoadmap>, "queryFn" | "queryKey"> {
  addToState?: boolean;
}

const useCreateRoadmap = (options?: IUseCreateRoadmapOptions) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [ROADMAP_CREATE],
    mutationFn: async (_roadmap: IRoadmap) => {
      const roadmap = new Roadmap(_roadmap);
      const res = await roadmap.create();
      return res.data;
    },
    onSuccess: async (roadmapId) => {
      if (options?.redirect && roadmapId)
        await navigate({ to: `/roadmaps/${roadmapId}/edit` });
    },
  });
};

const useFetchRoadmap = (
  roadmapId: string,
  options?: IUseFetchRoadmapOptions
) => {
  const { setEdges, setNodes } = useBuilderToolStore();
  return useQuery<IRoadmap>({
    ...options,
    queryKey: [ROADMAP_FETCH, roadmapId],
    queryFn: async ({ queryKey }) => {
      const [, _roadmapId] = queryKey;
      const res = await Roadmap.fetchOne(
        _roadmapId as NonNullable<IRoadmap["id"]>
      );
      const roadmap = res.data!;
      const visualBuilderData: IRoadmapSchema = JSON.parse(roadmap.schema);
      const transformResponse: IRoadmap = {
        ...roadmap,
        schema: visualBuilderData,
      };
      if (options?.addToState) {
        setEdges(visualBuilderData.edges);
        setNodes(visualBuilderData.nodes);
      }
      return transformResponse;
    },
  });
};

const useUpdateRoadmap = (roadmapId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ROADMAP_UPDATE, roadmapId],
    mutationFn: async (_roadmap: Partial<IRoadmap>) => {
      return await Roadmap.updateOne(roadmapId, _roadmap);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROADMAP_FETCH, roadmapId] });
    },
  });
};

const useFetchAllRoadmaps = () => {
  return useQuery({
    queryKey: [ROADMAP_FETCH_ALL],
    queryFn: async () => {
      const res = await Roadmap.fetchAll();
      return res.data;
    },
  });
};

export const roadmapApi = {
  useCreateRoadmap,
  useFetchRoadmap,
  useFetchAllRoadmaps,
  useUpdateRoadmap,
};
