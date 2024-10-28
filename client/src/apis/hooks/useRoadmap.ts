import { useMutation } from "@tanstack/react-query";
import { IRoadmap, Roadmap } from "@apis/http/endpoints/roadmap";
import { useNavigate } from "@tanstack/react-router";

export const ROADMAP_CREATE = "ROADMAP_CREATE_KEY" as const;
export const ROADMAP_FETCH = "ROADMAP_FETCH" as const;

export interface IUseCreateRoadmapOptions {
  redirect?: boolean;
}

const useCreateRoadmap = (options?: IUseCreateRoadmapOptions) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [ROADMAP_CREATE],
    mutationFn: async (_roadmap: IRoadmap) => {
      const roadmap = new Roadmap(_roadmap);
      const res = await roadmap.create();
      const roadmapId = res.data;
      if (options?.redirect && roadmapId)
        await navigate({ to: `/roadmaps/${roadmapId}/edit` });
    },
  });
};

export const roadmapApi = {
  useCreateRoadmap,
};
