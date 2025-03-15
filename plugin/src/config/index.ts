import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
  BUILD_PHY_API_URL: string;
  BUILD_PHY_API_KEY: string;
  BUILD_PHY_CLIENT_URL: string;
}

const Config: IConfig = {} as IConfig;

if (process.env.IS_LOCAL === "true") {
  Config.BUILD_PHY_API_KEY =
    "63397789cd1fc184a75366de639ebda335427036570a81f40817fe3c49672178839a070d8111373878951da320a01eb35428d46fcacdceb7510519e1930bba88";
  Config.BUILD_PHY_API_URL = "http://127.0.0.1:8000/api/v1";
  Config.BUILD_PHY_CLIENT_URL = "http://localhost:3000";
} else if (process.env.BUILD_PHY === "true") {
  Config.BUILD_PHY_API_KEY =
    "63397789cd1fc184a75366de639ebda335427036570a81f40817fe3c49672178839a070d8111373878951da320a01eb35428d46fcacdceb7510519e1930bba88";
  Config.BUILD_PHY_API_URL =
    "https://tory-rivkah-build-physician-eb659dac.koyeb.app/api/v1";
  Config.BUILD_PHY_CLIENT_URL = "https://slot-in-k3d3.vercel.app";
} else throw new Error("Environment not prodvided. Please add BUILD_PHY=true");

export default Config;
