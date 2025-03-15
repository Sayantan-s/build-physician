import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { NetworkConnection } from "@integrations/network";
import { BrowserRouter } from "react-router";
import "@theme/index.css";
import { ReactFlowProvider } from "@xyflow/react";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ReactFlowProvider>
          <NetworkConnection>
            <App />
          </NetworkConnection>
        </ReactFlowProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
