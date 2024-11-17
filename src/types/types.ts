import { JwtPayload } from "jwt-decode";

export type TUser = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    roles: TRole[];
};

export type TRole = "user" | "admin";

export type TLoginRequest = {
    username: string;
    password: string;
};

export type TLoginResponse = {
    jwtToken: string;
    roles: TRole[];
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
    roles: TRole[];
}

export type TDecodedToken = JwtPayload & TUser;