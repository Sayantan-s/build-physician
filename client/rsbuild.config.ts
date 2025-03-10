import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { mfConfig } from "./mf-config";

export default defineConfig({
  dev: {
    assetPrefix: true,
  },
  source: {
    alias: {
      "@components": "./src/components",
      "@store": "./src/store",
      "@routes": "./src/routes",
      "@theme": "./src/theme",
      "@apis": "./src/apis",
      "@integrations": "./src/integrations",
    },
  },
  plugins: [
    pluginReact(),
    // mfConfig()
  ],
  server: {
    open: true,
    host: "localhost",
    port: 3000,
  },
  html: {
    tags: [
      {
        tag: "link",
        attrs: { href: "https://fonts.googleapis.com", rel: "preconnect" },
      },
      {
        tag: "link",
        attrs: {
          href: "https://fonts.gstatic.com",
          rel: "preconnect",
          crossorigin: true,
        },
      },
      {
        tag: "link",
        attrs: {
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
          rel: "stylesheet",
        },
      },
    ],
  },
});
