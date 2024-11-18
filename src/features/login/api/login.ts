import { API_ENDPOINTS } from "@/constants";
import { TLoginRequest, TLoginResponse } from "@/types";

export async function login(creds: TLoginRequest): Promise<TLoginResponse> {
    const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return await res.json();
}