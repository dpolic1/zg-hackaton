import { API_ENDPOINTS } from "@/constants";
import { TErrorResponse, TRegisterRequest, TRegisterResponse } from "@/types";

export async function register(creds: TRegisterRequest): Promise<TRegisterResponse> {
    const res = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
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