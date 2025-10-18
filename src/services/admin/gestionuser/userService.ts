import axios from 'axios';
import { UserDTO } from '../../../types/admin/gestionuser/index';

const API_URL = '/api/User';

const apiClient = axios.create({
    baseURL: API_URL,
});


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

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