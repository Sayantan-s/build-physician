import axios from "axios";
import { Config } from "../config";
import { DTO } from "./DTO";

const http = axios.create({
  baseURL: Config.API_URL,
  headers: {
    "X-Api-Key": Config.API_KEY,
  },
});

http.interceptors.response.use(
  async function (ctx) {
    const data = structuredClone(ctx.data);
    ctx.data = DTO.extract(data);
    return ctx;
  },
  (error) => {
    if (error) console.log(error);
  }
);

export const builds = axios.create({
  ...http.defaults,
  baseURL: `${http.defaults.baseURL}/builds`,
});

builds.interceptors.response.use(
  async function (ctx) {
    const data = structuredClone(ctx.data);
    ctx.data = DTO.extract(data);
    return ctx;
  },
  (error) => {
    if (error) console.log(error);
  }
);
