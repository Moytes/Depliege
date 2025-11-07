import axios from 'axios';
import {
    UserDTO,
    CreateUserRequest,
    UpdateUserRequest,
    UpdatePasswordRequest,
} from '../../../types/admin/gestionuser/index';

const API_URL = '/api/User';

const apiClient = axios.create({
    baseURL: API_URL,
});

// -------------------------------------------------
// Interceptor: añadir JWT
// -------------------------------------------------
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// -------------------------------------------------
// Interceptor: manejo global de errores (401 → logout)
// -------------------------------------------------
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// -------------------------------------------------
// SHA‑256 (para contraseñas)
// -------------------------------------------------
export async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// -------------------------------------------------
// Servicio de usuarios
// -------------------------------------------------
export const userService = {
    /** Obtener todos los usuarios */
    getUsers: async (): Promise<UserDTO[]> => {
        const { data } = await apiClient.get<UserDTO[]>('/GetUsers');
        return data;
    },

    /** Crear usuario (solo admin) */
    createUser: async (userData: CreateUserRequest) => {
        const { data } = await apiClient.post('/CreateUser', userData);
        return data;
    },

    /** Actualizar datos del usuario (PATCH) */
    updateUser: async (id: string, userData: UpdateUserRequest) => {
        const { data } = await apiClient.patch(`/PatchUser/${id}`, userData);
        return data;
    },

    /** Cambiar contraseña (PATCH separado) */
    changePassword: async (id: string, passwordData: UpdatePasswordRequest) => {
        const { data } = await apiClient.patch(`/ChangePassword/${id}`, passwordData);
        return data;
    },

    /** Eliminar usuario */
    deleteUser: async (id: string) => {
        const { data } = await apiClient.delete(`/DeleteUser/${id}`);
        return data;
    },

    /** Obtener un usuario por ID */
    getUserById: async (id: string): Promise<UserDTO> => {
        const { data } = await apiClient.get<UserDTO>(`/GetUserById/${id}`);
        return data;
    },
};