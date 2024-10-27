import { api, IResponse } from "..";

const CREATE_ROADMAP = "/roadmap";

export interface IRoadmap {
  name: string;
  description: string;
}

export class Roadmap {
  constructor(private roadmap: IRoadmap) {}
  async create() {
    return await api.post<unknown, IResponse<string>, IRoadmap>(
      CREATE_ROADMAP,
      this.roadmap
    );
  }
}
