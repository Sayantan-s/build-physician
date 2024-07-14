import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth } from "./components/utils/Auth";
import { NetworkConnection } from "./integrations/network";
import { Theme } from "./theme";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <NetworkConnection>
        <Theme>
          <Auth>
            <App />
          </Auth>
        </Theme>
      </NetworkConnection>
    </React.StrictMode>
  );
}
