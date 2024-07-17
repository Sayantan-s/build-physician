import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { NetworkConnection, queryClient } from "./integrations/network";
import { routeTree } from "./routeTree.gen";
import { Theme } from "./theme";

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <NetworkConnection>
        <Theme>
          <RouterProvider router={router} />
        </Theme>
      </NetworkConnection>
    </React.StrictMode>
  );
}
