import { API_ENDPOINTS } from "@/constants";
import { TErrorResponse, TLoginRequest, TLoginResponse } from "@/types";

export async function addToFavorites(creds: TLoginRequest): Promise<TLoginResponse> {
    
    const res = await fetch(API_ENDPOINTS.USER.FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
    })

    if (!res.ok) {
        const error = await res.json() as TErrorResponse;
        throw new Error(error.detail);
    }

    return await res.json();
}