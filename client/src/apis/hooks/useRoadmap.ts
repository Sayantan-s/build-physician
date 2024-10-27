import { useMutation } from "@tanstack/react-query";
import { IRoadmap, Roadmap } from "@apis/http/endpoints/roadmap";

export const ROADMAP_CREATE = "ROADMAP_CREATE_KEY" as const;

const useCreateRoadmap = () =>
  useMutation({
    mutationKey: [ROADMAP_CREATE],
    mutationFn: async (_roadmap: IRoadmap) => {
      const roadmap = new Roadmap(_roadmap);
      return await roadmap.create();
    },
  });

export const roadmapApi = {
  useCreateRoadmap,
};
