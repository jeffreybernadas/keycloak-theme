/**
 * Email Branding Configuration
 *
 * Note: Unlike login branding, email logos MUST be public URLs
 * because email clients cannot access bundled assets.
 *
 * Emails don't have client context, so we use realm-based or default branding.
 */

export interface EmailBranding {
  name: string;
  logo: string; // Must be a public URL
  primaryColor: string;
  btnTextColor: string;
  address: string;
}

/**
 * Realm-specific branding (optional)
 * Key should match the Keycloak realm name
 */
export const realmBranding: Record<string, EmailBranding> = {
  // Example:
  // 'my-realm': {
  //   name: 'My Company',
  //   logo: 'https://example.com/logo.png',
  //   primaryColor: '#2196F3',
  //   btnTextColor: '#ffffff',
  //   address: '123 Example St., City, Country',
  // },
};

/**
 * Default branding used when realm-specific branding is not found
 */
export const defaultEmailBranding: EmailBranding = {
  name: 'Jeffrey Bernadas',
  logo: 'https://jeffreybernadas.com/assets/icons/apple-icon.png',
  primaryColor: '#2196F3',
  btnTextColor: '#ffffff',
  address: 'Taguig City, Philippines',
};

/**
 * Get branding for a specific realm
 * Falls back to default branding if realm-specific branding is not found
 */
export function getEmailBranding(realmName?: string): EmailBranding {
  if (realmName && realmBranding[realmName]) {
    return realmBranding[realmName];
  }
  return defaultEmailBranding;
}
