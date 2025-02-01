import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export const mfConfig = () =>
  pluginModuleFederation({
    name: "editor",
    exposes: {
      ".": "./src/Editor.tsx",
    },
    shared: {
      react: { singleton: true, eager: true },
      "react-dom": { singleton: true, eager: true },
    },
  });
