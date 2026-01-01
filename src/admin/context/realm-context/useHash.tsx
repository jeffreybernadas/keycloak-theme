/**
 * WARNING: Before modifying this file, run the following command:
 * 
 * $ npx keycloakify own --path "admin/context/realm-context/useHash.tsx"
 * 
 * This file is provided by @keycloakify/keycloak-admin-ui version 260305.0.0.
 * It was copied into your repository by the postinstall script: `keycloakify sync-extensions`.
 */

/* eslint-disable */

// @ts-nocheck

import { useEffect, useState } from "react";

export const useHash = () => {
  const [hash, setHash] = useState(location.hash);

  useEffect(() => {
    const orgPushState = window.history.pushState;
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (func, target, args) => {
        setHash(args[2].substring(1));
        return Reflect.apply(func, target, args);
      },
    });
    return () => {
      window.history.pushState = orgPushState;
    };
  }, []);
  return decodeURIComponent(hash);
};
