import { API_ENDPOINTS } from "@/constants";
import { TErrorResponse, TUser } from "@/types";

export async function fetchUserInfo(): Promise<TUser> {
    const res = await fetch(API_ENDPOINTS.USER.GET, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
    })

    if (!res.ok) {
        const error = await res.json() as TErrorResponse;
        throw new Error(error.detail);
    }

    return await res.json();
}