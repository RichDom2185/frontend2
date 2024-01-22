const backendUrl: string = import.meta.env.VITE_BACKEND_URL || '';

const Constants = Object.freeze({
  backendUrl,
});

export default Constants;
