/**
 * WARNING: Before modifying this file, run the following command:
 * 
 * $ npx keycloakify own --path "admin/components/keycloak-spinner/KeycloakSpinner.tsx"
 * 
 * This file is provided by @keycloakify/keycloak-admin-ui version 260305.0.0.
 * It was copied into your repository by the postinstall script: `keycloakify sync-extensions`.
 */

/* eslint-disable */

// @ts-nocheck

import { Bullseye, Spinner } from "../../../shared/@patternfly/react-core";
import { useTranslation } from "react-i18next";

export const KeycloakSpinner = () => {
  const { t } = useTranslation();

  return (
    <Bullseye>
      <Spinner aria-label={t("spinnerLoading")} />
    </Bullseye>
  );
};
