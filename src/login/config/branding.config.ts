import minifiLogo from '../assets/img/clients/minifi.png';
import jbLogo from '../assets/img/clients/jb.png';

export interface ClientBranding {
  name: string;
  logo: string;
  welcomeMessage: string;
}

export const clientBranding: Record<string, ClientBranding> = {
  minifi: {
    name: 'Minifi',
    logo: minifiLogo,
    welcomeMessage: 'Welcome to Minifi - Track and grow your shortned links.',
  },
};

export const defaultBranding: ClientBranding = {
  name: 'Jeffrey Bernadas',
  logo: jbLogo,
  welcomeMessage:
    'This is the default theme of this keycloak realm. Either this client is not configured properly or you are just completely lost.',
};
