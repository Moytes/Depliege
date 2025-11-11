export const Roles = {
    Administrador: 1,
    User: 2,
} as const;

export const Status = {
    Active: 1,
    Inactive: 2,
} as const;


export interface AddUserRequest {
    mail: string;
    userName: string;
    password: string; 
    role: number;     
}


export interface GetUsersDto {
    id: string;       
    mail: string;
    userName: string;
    role: number;     
    status: number;   
    verified: number;
}


export interface GetUserDto {
    mail: string;
    userName: string;
    role: number;
    status: number;
    verified: number;
}

export interface PatchUserRequest {
    mail: string;
    userName: string;
}


export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}


export interface VerifyUserRequest {
    userId: string;
    verificationCode: string;
}

export interface ResendCodeRequest {
    userId: string;
}