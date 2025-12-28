import { useKcContext } from "../KcContext";
import {
  clientBranding,
  defaultBranding,
  type ClientBranding,
} from "../config/branding.config";

export function useBranding(): ClientBranding {
  const { kcContext } = useKcContext();
  const clientId = kcContext.client?.clientId;

  if (clientId && clientId in clientBranding) {
    return clientBranding[clientId];
  }

  return defaultBranding;
}
