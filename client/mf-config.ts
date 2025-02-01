import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export const mfConfig = () =>
  pluginModuleFederation({
    name: "client",
    remotes: {
      editor: "editor@http://localhost:3002/mf-manifest.json",
    },
    shared: {
      react: { singleton: true, eager: true },
      "react-dom": { singleton: true, eager: true },
    },
  });
