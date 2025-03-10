///builds/build_2cClbfWDs
import { api, IResponse } from "..";
import { IBuild } from "@store/auth/types";

const GET_ONE_BUILD_URL = (buildId: string) => `/builds/${buildId}`;

export const getBuildData = async (buildId: string) =>
  await api.get<IBuild>(GET_ONE_BUILD_URL(buildId));
