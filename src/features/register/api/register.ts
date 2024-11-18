import { API_ENDPOINTS } from "@/constants";
import { TRegisterRequest, TRegisterResponse } from "@/types";

export async function register(creds: TRegisterRequest): Promise<TRegisterResponse> {
    const res = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
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