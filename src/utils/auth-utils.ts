import { TDecodedToken, TRole, TUser } from "@/types";
import { jwtDecode } from "jwt-decode";

export const validateToken = (jwtToken: string | null): { isValid: boolean, decodedToken?: TDecodedToken } => {
    if (!jwtToken) {
        return {
            isValid: false,
        }
    }

    const decodedToken: TDecodedToken = jwtDecode(jwtToken);
    const isTokenExpired = decodedToken.exp ? decodedToken.exp * 1000 < Date.now() : true;

    if (isTokenExpired) {
        return {
            isValid: false,
        }
    }

    return {
        isValid: true,
        decodedToken
    }
}

export const hasRole = (user: TUser, roles: TRole[] = []) => {
    return roles.some(role => user.roles.includes(role));
}