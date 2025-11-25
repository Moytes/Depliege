export interface GetUsersDTO {
  id: string;
  mail: string;
  userName: string;
  role: number; 
}

export interface UserTableData {
  key: string;
  nombre: string;
  correo: string;
  rol: number; 
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