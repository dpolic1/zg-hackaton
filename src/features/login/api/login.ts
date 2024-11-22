import { API_ENDPOINTS } from "@/constants";
import { TErrorResponse, TLoginRequest, TLoginResponse } from "@/types";

export async function login(creds: TLoginRequest): Promise<TLoginResponse> {
    const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
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