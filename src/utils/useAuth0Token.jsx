import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function useAuth0Token() {
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!token && localStorage.getItem("@tuckermillerdev/access_token")) {
      setToken(localStorage.getItem("@tuckermillerdev/access_token"));
    } else if (!token) {
      setToken(getAccessTokenSilently());
    }
  }, [token, getAccessTokenSilently]);

  return token;
}
