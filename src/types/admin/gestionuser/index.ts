export interface GetUsersDTO {
  id: string;
  mail: string;
  userName: string;
  role: string;
}

export interface UserTableData {
  key: string;
  nombre: string;
  correo: string;
  rol: string;
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