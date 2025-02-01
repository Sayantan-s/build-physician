import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginStyledComponents } from "@rsbuild/plugin-styled-components";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";
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
    pluginStyledComponents({
      displayName: true,
      fileName: true,
      transpileTemplateLiterals: true,
      minify: true,
    }),
    mfConfig(),
  ],
  server: {
    open: true,
    host: "localhost",
    port: 3000,
  },
  tools: {
    rspack: {
      plugins: [
        import.meta.env.PUBLIC_ENVIRONMENT === "development"
          ? TanStackRouterRspack()
          : null,
      ],
    },
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
          href: "https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600;700;800;900&display=swap",
          rel: "stylesheet",
        },
      },
    ],
  },
});
