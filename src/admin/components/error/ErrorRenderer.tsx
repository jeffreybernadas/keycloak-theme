/**
 * WARNING: Before modifying this file, run the following command:
 * 
 * $ npx keycloakify own --path "admin/components/error/ErrorRenderer.tsx"
 * 
 * This file is provided by @keycloakify/keycloak-admin-ui version 260305.0.0.
 * It was copied into your repository by the postinstall script: `keycloakify sync-extensions`.
 */

/* eslint-disable */

// @ts-nocheck

import { NetworkError } from "@keycloak/keycloak-admin-client";
import { type FallbackProps } from "../../../shared/keycloak-ui-shared";
import {
  Alert,
  AlertActionCloseButton,
  AlertActionLink,
  AlertVariant,
  PageSection,
} from "../../../shared/@patternfly/react-core";
import { useTranslation } from "react-i18next";

export const ErrorRenderer = ({ error }: FallbackProps) => {
  const { t } = useTranslation();

  const reset = () => {
    window.location.href = window.location.origin + window.location.pathname;
  };

  let message;
  if (error instanceof NetworkError && error.response.status === 403) {
    message = t("forbiddenAdminConsole");
  } else {
    message = error.message;
  }
  return (
    <PageSection>
      <Alert
        isInline
        variant={AlertVariant.danger}
        title={message}
        actionClose={
          <AlertActionCloseButton title={error.message} onClose={reset} />
        }
        actionLinks={
          <AlertActionLink onClick={() => location.reload()}>
            {t("reload")}
          </AlertActionLink>
        }
      ></Alert>
    </PageSection>
  );
};
