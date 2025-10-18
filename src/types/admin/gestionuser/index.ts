export interface UserDTO {
    id: string;
    email: string;
    userName: string;
    role: number; 
}

export interface UserTableType {
    key: string;
    id: string;
    name: string;
    email: string;
    role: string;
    roleId: number;
}

export const ROLES: { [key: number]: string } = {
    1: 'Administrador',
    2: 'Usuario',
};