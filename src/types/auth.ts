export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface RegisterRequest {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface RegisterUserAlreadyExistsResponse {
    detail: string;
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
    isActive: boolean;
    isSuperuser: boolean;
    isVerified: boolean;
}