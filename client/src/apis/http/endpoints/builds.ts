import { IBuild } from "@store/build/types";
import { api } from "..";

const GET_ONE_BUILD_URL = (buildId: string) => `/builds/${buildId}`;

export const getBuildData = async (buildId: string) =>
  await api.get<IBuild>(GET_ONE_BUILD_URL(buildId));
