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

/**
 * Solicitud para crear un nuevo usuario (usada en POST /CreateUser)
 * → Usa PascalCase para coincidir con el backend (AddUserRequest)
 */
export interface CreateUserRequest {
  UserName: string;   // ← PascalCase
  Mail: string;       // ← PascalCase
  Password: string;   // ← hasheada con SHA-256
  Role: number;       // ← 1 = Admin, 2 = User
}

/**
 * Solicitud para actualizar datos del usuario (usada en PATCH /PatchUser/{id})
 * → Usa PascalCase para coincidir con el backend (PatchUserRequest)
 */
export interface UpdateUserRequest {
  UserName?: string;  // opcional
  Mail?: string;      // opcional
  Role?: number;      // opcional (solo admin)
}

/**
 * Solicitud para cambiar contraseña (usada en PATCH /ChangePassword/{id})
 */
export interface UpdatePasswordRequest {
  CurrentPassword?: string;    // ← Añadido: requerido para verificar la contraseña actual (hasheada)
  NewPassword: string;         // hasheada
  ConfirmNewPassword: string;  // hasheada (debe coincidir)
}

export interface UserProfile {
  id: string;
  userName: string;
  email: string;
  role: number;
}

/**
 * Mapeo de roles (número → texto)
 */
export const ROLES: { [key: number]: string } = {
  1: 'Administrador',
  2: 'Usuario',
};

/**
 * Verifica si el rol es Administrador
 */
export const isAdmin = (role: number): boolean => role === 1;

/**
 * Verifica si el rol es Usuario regular
 */
export const isRegularUser = (role: number): boolean => role === 2;