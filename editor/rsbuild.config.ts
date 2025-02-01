import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { mfConfig } from "./mf-config";

export default defineConfig({
  plugins: [pluginReact(), mfConfig()],
  server: {
    port: 3002,
  },
});
