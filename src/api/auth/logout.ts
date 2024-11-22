import { API_ENDPOINTS } from "@/constants";
import { TErrorResponse } from "@/types";

export async function logout(): Promise<void> {
    const res = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },

    })

    if (!res.ok) {
        const error = await res.json() as TErrorResponse;
        throw new Error(error.detail);
    }
}