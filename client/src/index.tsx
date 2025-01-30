import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { NetworkConnection } from "@integrations/network";
import { Theme } from "@theme";
import { ReactFlowProvider } from "@xyflow/react";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <NetworkConnection>
        <ReactFlowProvider>
          <Theme>
            <App />
          </Theme>
        </ReactFlowProvider>
      </NetworkConnection>
    </React.StrictMode>
  );
}
