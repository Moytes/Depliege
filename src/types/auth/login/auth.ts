export interface LoginUserData {
    Mail: string;
    Password: string;
}

export interface LoginResponse {
    jwttoken: string;
    role: number; 
    verified: number; 
}

export interface DecodedToken {
    rol?: string; 
    sub?: string; 
    exp?: number;
    [key: string]: any;
}