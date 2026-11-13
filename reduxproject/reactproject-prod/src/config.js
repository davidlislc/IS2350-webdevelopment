// Configuration loader
// Uses environment variables prefixed with VITE_ (Vite's convention)
// Fallback to defaults if variables are not set

const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost/api',
  loginUrl: import.meta.env.VITE_LOGIN_URL || 'http://localhost/login',
};

export default config;
