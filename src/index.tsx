import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Auth0Provider
    domain="dev-hd14qqerjniwfv47.eu.auth0.com"
    clientId="iOdxTgChtilliRjf7FN7eSJE1zQXAnwB"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://spring-boot-api",
      scope: "openid profile email",
    }}
  >
    <App />
  </Auth0Provider>
);
