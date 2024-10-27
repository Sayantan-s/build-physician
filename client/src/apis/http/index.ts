import axios from "axios";
import { getIdToken } from "firebase/auth";
import Firebase from "@integrations/firebase";

export interface IResponse<TData> {
  requestId: string;
  status: number;
  data: TData;
  success: boolean;
}
export const api = axios.create({
  baseURL: `${import.meta.env.PUBLIC_API_URI}/api/v1`,
  headers: {
    "X-Api-Key": import.meta.env.PUBLIC_API_KEY,
  },
});

api.interceptors.request.use(async function (config) {
  const user = Firebase.auth.currentUser;
  if (user) {
    const token = await getIdToken(user, true);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
