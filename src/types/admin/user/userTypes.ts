export const Roles = {
    Administrador: 1,
    User: 2,
} as const;

export const Status = {
    Active: 1,
    Inactive: 2,
} as const;

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

export interface AddUserRequest {
    mail: string;
    userName: string;
    password: string; 
    role: number;
}

export interface PatchUserRequest {
    mail: string;
    userName: string;
}

export interface ResendCodeRequest {
    userId: string;
}

export interface UserTableData {
    key: string;
    id: string;
    nombre: string;
    correo: string;
    rol: number;
    estatus: number;
    verificado: number;
}