const backendUrl: string = import.meta.env.VITE_BACKEND_URL || '';
const sicpBackendUrl: string = import.meta.env.VITE_SICP_BACKEND_URL || '';

const Constants = Object.freeze({
  backendUrl,
  sicpBackendUrl,
});

export default Constants;
