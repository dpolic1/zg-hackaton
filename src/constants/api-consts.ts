import { APP_BACKEND_URL } from "./app-consts";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${APP_BACKEND_URL}/users/login`,
        REGISTER: `${APP_BACKEND_URL}/users/register`,
        LOGOUT: `${APP_BACKEND_URL}/users/logout`,
        REFRESH: `${APP_BACKEND_URL}/auth/refresh`,
        TEST: `${APP_BACKEND_URL}/example/test-authenticated`,
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