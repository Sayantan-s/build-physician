import { TMeetingInfoNode } from "@components/stories/organisms/RoadmapBuilder/Nodes/MeetingInfo/types";
import { api, IResponse } from "..";
import { Edge } from "@xyflow/react";

const ROAD_MAP = "/roadmap";
const FETCH_ONE_ROADMAP = (roadmapId: string) => `${ROAD_MAP}/${roadmapId}`;
const FETCH_ALL_ROADMAP = () => `${ROAD_MAP}/all`;

export interface IRoadmapSchema {
  nodes: TMeetingInfoNode[];
  edges: Edge[];
}
export interface IRoadmap {
  id?: string;
  name: string;
  description: string;
  schema?: IRoadmapSchema;
  created_by?: string;
  updated_by?: string;
}

export interface IRoadmapResponse {
  id: string;
  name: string;
  description: string;
  schema: string;
  created_by: string;
  updated_by: string;
}

export class Roadmap {
  constructor(private roadmap: IRoadmap) {}
  async create() {
    return await api.post<unknown, IResponse<string>, IRoadmap>(
      ROAD_MAP,
      this.roadmap
    );
  }

  static async fetchOne(roadmapId: string) {
    return await api.get<unknown, IResponse<IRoadmapResponse>>(
      FETCH_ONE_ROADMAP(roadmapId)
    );
  }

  static async fetchAll() {
    return await api.get<unknown, IResponse<IRoadmapResponse[]>>(
      FETCH_ALL_ROADMAP()
    );
  }

  static async updateOne(roadmapId: string, roadmapData: Partial<IRoadmap>) {
    return await api.patch<unknown, IResponse<null>>(
      FETCH_ONE_ROADMAP(roadmapId),
      roadmapData
    );
  }
}
