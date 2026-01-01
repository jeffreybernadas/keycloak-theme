/**
 * WARNING: Before modifying this file, run the following command:
 *
 * $ npx keycloakify own --path "login/mocks/getKcContextMock.ts"
 *
 * This file is provided by @oussemasahbeni/keycloakify-login-shadcn version 250004.0.11.
 * It was copied into your repository by the postinstall script: `keycloakify sync-extensions`.
 */

/* eslint-disable */

import { createGetKcContextMock } from '@keycloakify/login-ui/KcContext/getKcContextMock';
import { kcEnvDefaults, themeNames } from '../../kc.gen';
import type {
  KcContextExtension,
  KcContextExtensionPerPage,
} from '../KcContext';

const kcContextExtension: KcContextExtension = {
  themeName: themeNames[0],
  client: {
    clientId: 'minifi', // Uncomment to test Minifi branding
    baseUrl: 'https://my-theme.keycloakify.dev',
  },
  darkMode: true,
  properties: {
    ...kcEnvDefaults,
  },
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {};

export const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension,
  kcContextExtensionPerPage,
  overrides: {},
  overridesPerPage: {},
});
