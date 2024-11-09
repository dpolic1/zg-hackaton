import { APP_BACKEND_URL } from "./app-consts";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${APP_BACKEND_URL}/auth/login`,
        REGISTER: `${APP_BACKEND_URL}/auth/register`,
        LOGOUT: `${APP_BACKEND_URL}/auth/logout`,
        REFRESH: `${APP_BACKEND_URL}/auth/refresh`,
    },
    ITEM: {
        RECENTLY_VIEWED: {
            GET: `${APP_BACKEND_URL}/items/recently-viewed`,
            GET_ALL: `${APP_BACKEND_URL}/items/recently-viewed/all`,
        },
        FAVORITES: {
            GET: `${APP_BACKEND_URL}/items/favorites`,
            GET_ALL: `${APP_BACKEND_URL}/items/favorites/all`,
            UPDATE: `${APP_BACKEND_URL}/items/favorites/update`,
        },
    },
    USER: {
        GET: `${APP_BACKEND_URL}/user`,
        CREATE: `${APP_BACKEND_URL}/user/create`,
        UPDATE: `${APP_BACKEND_URL}/user/update`,
        DELETE: `${APP_BACKEND_URL}/user/delete`,
    },
} as const;

console.log("API_ENDPOINTS", API_ENDPOINTS);