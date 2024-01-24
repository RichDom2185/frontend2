const appName: string = import.meta.env.VITE_APP_NAME || '';
const backendUrl: string = import.meta.env.VITE_BACKEND_URL || '';
const sicpBackendUrl: string = import.meta.env.VITE_SICP_BACKEND_URL || '';

// Feature flags
const enableSource: boolean = import.meta.env.VITE_FEATURE_ENABLE_SOURCE === 'TRUE' || false;
const enableFullJs: boolean = import.meta.env.VITE_FEATURE_ENABLE_FULL_JS === 'TRUE' || false;
const enableFullTs: boolean = import.meta.env.VITE_FEATURE_ENABLE_FULL_TS === 'TRUE' || false;
const enableHtml: boolean = import.meta.env.VITE_FEATURE_ENABLE_HTML === 'TRUE' || false;
const enablePython: boolean = import.meta.env.VITE_FEATURE_ENABLE_PYTHON === 'TRUE' || false;
const enableScheme: boolean = import.meta.env.VITE_FEATURE_ENABLE_SCHEME === 'TRUE' || false;

const Constants = Object.freeze({
  appName,
  backendUrl,
  sicpBackendUrl,
  featureFlags: {
    enableSource,
    enableFullJs,
    enableFullTs,
    enableHtml,
    enablePython,
    enableScheme,
  },
});

export default Constants;
