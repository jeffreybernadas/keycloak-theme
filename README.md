# Keycloak Theme

Custom Keycloak login theme built with React, TypeScript, Tailwind CSS, and shadcn/ui using [Keycloakify](https://keycloakify.dev) based on [@oussemasahbeni/keycloakify-login-shadcn](https://www.npmjs.com/package/@oussemasahbeni/keycloakify-login-shadcn) template.

## Features

- Modern UI with shadcn/ui components
- Dark mode support
- Multi-language support (EN, AR, FR)
- **Dynamic client branding** - Different logos, favicons, names, and welcome messages per client

## Development

```bash
# Install dependencies
npm install

# Start dev server (Storybook)
npm run dev

# Or run Storybook directly
npm run storybook
```

## Building the Theme

```bash
npm run build-keycloak-theme
```

This creates a JAR file in `dist_keycloak/` (e.g., `keycloak-theme-for-kc-26-and-above.jar`).

## Deployment to Keycloak (Coolify + Docker Compose)

### Step 1: Add providers volume to Docker Compose

In Coolify, update your Keycloak service's Docker Compose to add a volume for providers:

```yaml
services:
  keycloak:
    image: 'quay.io/keycloak/keycloak:26.1'
    command:
      - start
    volumes:
      - 'keycloak-data:/opt/keycloak/data'
      - 'keycloak-providers:/opt/keycloak/providers'
    # ... rest of your config

volumes:
  keycloak-data:
  keycloak-postgresql-data:
  keycloak-providers:
```

Deploy the updated config in Coolify.

### Step 2: Build the theme JAR

```bash
npm run build-keycloak-theme
```

This creates `dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar`.

### Step 3: Upload JAR to your VPS

```bash
scp dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar user@your-vps:~/
```

Verify the file was uploaded:

```bash
ssh user@your-vps "ls -la ~/keycloak-theme-for-kc-all-other-versions.jar"
```

### Step 4: Find the Docker volume path

SSH into your VPS and find the volume name:

```bash
sudo docker volume ls | grep keycloak-providers
```

This outputs something like:

```
local     tw80s0sw4w8wkg8owsk0k84c_keycloak-providers
```

The part before `_keycloak-providers` is your project ID (e.g., `tw80s0sw4w8wkg8owsk0k84c`).

Your volume path will be:

```
/var/lib/docker/volumes/<project_id>_keycloak-providers/_data/
```

To confirm the exact path, run:

```bash
sudo docker volume inspect <project_id>_keycloak-providers
```

Look for the `Mountpoint` value in the output.

### Step 5: Copy JAR to the Docker volume

Remove old JAR (if redeploying):

```bash
sudo rm -f /var/lib/docker/volumes/<project_id>_keycloak-providers/_data/*.jar
```

Copy new JAR:

```bash
sudo cp ~/keycloak-theme-for-kc-all-other-versions.jar /var/lib/docker/volumes/<project_id>_keycloak-providers/_data/
```

Verify the JAR is there:

```bash
sudo ls -la /var/lib/docker/volumes/<project_id>_keycloak-providers/_data/
```

Clean up home directory (optional):

```bash
rm ~/keycloak-theme-for-kc-all-other-versions.jar
```

### Step 6: Restart Keycloak

Restart the Keycloak service via Coolify dashboard.

### Step 7: Enable the theme (first time only)

1. Go to **Keycloak Admin Console**
2. Navigate to **Realm Settings** → **Themes**
3. Set **Login theme** to `keycloak-theme`
4. Click **Save**

> **Redeploying:** For future updates, repeat Steps 2-6 (skip Step 1 and 7).

## Dynamic Client Branding

This theme supports different branding per OAuth client. Each client can have its own logo, name, and welcome message.

### How it works

When a user logs in through a client, Keycloak provides the `clientId`. The theme looks up the branding configuration for that client and displays it. If no branding is configured, it falls back to the default.

### Configuration file

Branding is configured in `src/login/config/branding.config.ts`:

```typescript
import minifiLogo from '../assets/img/clients/minifi.png';
import defaultLogo from '../assets/img/auth-logo.svg';

export const clientBranding: Record<string, ClientBranding> = {
  minifi: {
    name: 'Minifi',
    logo: minifiLogo,
    welcomeMessage: 'Welcome to Minifi - Your gateway to seamless planning.',
  },
  // Add more clients here
};

export const defaultBranding: ClientBranding = {
  name: 'Acme Inc.',
  logo: defaultLogo,
  welcomeMessage: 'Welcome to Acme inc - Your gateway to seamless planning.',
};
```

### Adding a new client

1. **Create the client in Keycloak Admin Console** and note the `clientId`

2. **Add the logo** to `src/login/assets/img/clients/`:

   ```
   src/login/assets/img/clients/your-client.png
   ```

3. **Update branding config** in `src/login/config/branding.config.ts`:

   ```typescript
   import yourClientLogo from '../assets/img/clients/your-client.png';

   export const clientBranding: Record<string, ClientBranding> = {
     // existing clients...
     'your-client-id': {
       name: 'Your Client Name',
       logo: yourClientLogo,
       welcomeMessage: 'Welcome to Your Client!',
     },
   };
   ```

4. **Rebuild and redeploy** - Follow Steps 2-6 in the [Deployment](#deployment-to-keycloak-coolify--docker-compose) section.

### Testing branding in development

Edit `src/login/mocks/getKcContextMock.ts` to test different client branding:

```typescript
client: {
  clientId: 'minifi', // Change this to test different clients
  baseUrl: 'https://my-theme.keycloakify.dev',
},
```

## Project Structure

```
src/
├── login/
│   ├── assets/img/
│   │   ├── clients/         # Client-specific logos
│   │   ├── auth-logo.svg    # Default logo
│   │   └── shape.svg        # Background decoration
│   ├── components/
│   │   └── Template/        # Main layout component
│   ├── config/
│   │   └── branding.config.ts  # Client branding configuration
│   ├── hooks/
│   │   └── useBranding.ts   # Hook to get current client branding
│   ├── pages/               # Login page variants
│   └── mocks/               # Development mock data
└── components/              # Shared UI components (shadcn)
```
