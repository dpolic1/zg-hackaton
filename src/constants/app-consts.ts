export const APP_BACKEND_PORT = 8080;
export const APP_BACKEND_URL = `${process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : `http://localhost:${APP_BACKEND_PORT}`}`;
export const APP_NAME = 'My App';