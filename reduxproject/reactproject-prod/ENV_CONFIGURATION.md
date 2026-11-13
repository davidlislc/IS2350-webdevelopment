# Server Configuration Guide

This application uses environment variables to configure server URLs, eliminating hardcoded localhost references.

## Setup

### 1. Create Your Local Configuration

Copy the example configuration file and customize it for your environment:

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your server URLs:

```env
# Development (default)
VITE_API_BASE_URL=http://localhost/api
VITE_LOGIN_URL=http://localhost/login

# Production example
# VITE_API_BASE_URL=https://api.example.com
# VITE_LOGIN_URL=https://example.com/login
```

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_API_BASE_URL` | Base URL for API endpoints | `http://localhost/api` |
| `VITE_LOGIN_URL` | Login endpoint URL | `http://localhost/login` |

## How It Works

1. **Config File** (`src/config.js`): Centralized configuration loader that reads environment variables
2. **Vite Integration**: Uses Vite's `import.meta.env` to inject environment variables at build time
3. **Import in Components**: Components import the config and use it instead of hardcoded URLs

Example:

```javascript
import config from './config';

const API_BASE_URL = config.apiBaseUrl;
const LOGIN_URL = config.loginUrl;
```

## Deployment Scenarios

### Development
```env
VITE_API_BASE_URL=http://localhost/api
VITE_LOGIN_URL=http://localhost/login
```

### Production
```env
VITE_API_BASE_URL=https://api.production.com
VITE_LOGIN_URL=https://production.com/login
```

### Staging
```env
VITE_API_BASE_URL=https://api.staging.com
VITE_LOGIN_URL=https://staging.com/login
```

## Important Notes

- **`.env` is gitignored**: Your local `.env` file won't be committed to version control
- **Use `.env.example`**: Commit `.env.example` as a template for contributors
- **VITE_ prefix**: Environment variables must start with `VITE_` to be exposed to the client
- **Build-time substitution**: Variables are replaced during the build process, not at runtime

## Further Customization

To add more configurable variables:

1. Add them to `.env`:
   ```env
   VITE_YOUR_VARIABLE=value
   ```

2. Add them to `src/config.js`:
   ```javascript
   const config = {
     yourVariable: import.meta.env.VITE_YOUR_VARIABLE || 'default-value',
   };
   ```

3. Use in your components:
   ```javascript
   import config from './config';
   
   console.log(config.yourVariable);
   ```
