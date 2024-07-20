import { api, IResponse } from "..";
import { IUser } from "../../../store/auth/types";

const SIGNIN = "/auth/signin";

export const getSigninMetaData = async () =>
  await api.get<IResponse<IUser>>(SIGNIN);
