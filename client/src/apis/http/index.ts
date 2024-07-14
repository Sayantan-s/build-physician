import axios from "axios";

export const api = axios.create({
  url: `${import.meta.env.PUBLIC_API_URI}/api/v1`,
  headers: {
    "x-api-key": import.meta.env.PUBLIC_API_KEY,
  },
});
