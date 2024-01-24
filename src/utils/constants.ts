const appName: string = import.meta.env.VITE_APP_NAME || '';
const backendUrl: string = import.meta.env.VITE_BACKEND_URL || '';
const sicpBackendUrl: string = import.meta.env.VITE_SICP_BACKEND_URL || '';

const Constants = Object.freeze({
  appName,
  backendUrl,
  sicpBackendUrl,
});

export default Constants;
