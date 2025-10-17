// src/views/admin/page/gestionuser/services/userService.ts

import axios from 'axios';
import { UserDTO } from '../../../types/admin/gestionuser/index';

const API_URL = '/api/User';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Interceptor para añadir el token JWT a cada petición
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Función de hashing SHA-256
export async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Objeto con todos los métodos para interactuar con la API de usuarios
export const userService = {
    getUsers: async (): Promise<UserDTO[]> => {
        const response = await apiClient.get<UserDTO[]>('/GetUsers');
        return response.data;
    },
    createUser: (userData: any) => {
        return apiClient.post('/CreateUser', userData);
    },
    updateUser: (id: string, userData: any) => {
        return apiClient.patch(`/PatchUser/${id}`, userData);
    },
    deleteUser: (id: string) => {
        return apiClient.delete(`/DeleteUser/${id}`);
    }
};