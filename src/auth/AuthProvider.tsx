import { Auth0Provider } from "@auth0/auth0-react";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  return (
    <Auth0Provider
      domain="dev-hd14qqerjniwfv47.eu.auth0.com"
      clientId="iOdxTgChtilliRjf7FN7eSJE1zQXAnwB"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://spring-boot-api",
        scope: "openid profile email"
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
