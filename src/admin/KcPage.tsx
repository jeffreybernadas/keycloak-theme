/**
 * WARNING: Before modifying this file, run the following command:
 * 
 * $ npx keycloakify own --path "admin/KcPage.tsx"
 * 
 * This file is provided by @keycloakify/keycloak-admin-ui version 260305.0.0.
 * It was copied into your repository by the postinstall script: `keycloakify sync-extensions`.
 */

/* eslint-disable */

import { lazy } from "react";
import { KcAdminUiLoader } from "@keycloakify/keycloak-admin-ui";
import type { KcContext } from "./KcContext";

const KcAdminUi = lazy(() => import("./KcAdminUi"));

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    return <KcAdminUiLoader kcContext={kcContext} KcAdminUi={KcAdminUi} darkModePolicy="auto" />;
}
