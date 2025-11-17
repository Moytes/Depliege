export interface GetUsersDTO {
  id: string;
  mail: string;
  userName: string;
  role: number; // Cambiado a number para consistencia con backend y userTypes.ts
}

export interface UserTableData {
  key: string;
  nombre: string;
  correo: string;
  rol: number; // Cambiado a number
  id: string;
}

export interface UpdateUserRequest {
  Mail: string;
  UserName: string;
}

export interface UpdatePasswordRequest {
  CurrentPassword: string;
  NewPassword: string;
  ConfirmNewPassword: string;
}