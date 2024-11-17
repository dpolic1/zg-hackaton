import { API_ENDPOINTS } from "@/constants";

export async function logout(): Promise<void> {
    const res = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        headers: {
            method: 'POST',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },

    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
}