import { JwtPayload } from "jwt-decode";

export type TLogoSize = "icon" | "sm" | "md" | "lg";

export type TUser = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    roles: TRole[];
};

export type TRole = "ROLE_USER" | "ROLE_ADMIN";

export type TLoginRequest = {
    username: string;
    password: string;
};

export type TLoginResponse = {
    jwtToken: string;
    user: TUser;
}

export type TRegisterRequest = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
};

export type TRegisterResponse = {
    jwtToken: string;
    user: TUser;
}

export type TErrorResponse = {
    detail: string;
    status: number;
    title: string;
    type: string;
    instance: string;
}

export type TDecodedToken = JwtPayload & TUser;