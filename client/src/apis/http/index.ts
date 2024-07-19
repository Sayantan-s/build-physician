import axios from "axios";
import { getIdToken } from "firebase/auth";
import Firebase from "../../integrations/firebase";

export const api = axios.create({
  baseURL: `${import.meta.env.PUBLIC_API_URI}/api/v1`,
  withCredentials: true,
});

api.interceptors.request.use(async function (config) {
  if (Firebase.auth.currentUser) {
    const token = await getIdToken(Firebase.auth.currentUser);
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["X-Api-Key"] = import.meta.env.PUBLIC_API_KEY;
  return config;
});
