import { API_ENDPOINTS } from "@/constants";
import { TUser } from "@/types";

export async function fetchUserInfo(): Promise<TUser> {
    const res = await fetch(API_ENDPOINTS.USER.GET, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return await res.json();
}