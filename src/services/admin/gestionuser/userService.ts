// services/admin/gestionuser/userService.ts
import axios from 'axios';
import { GetUsersDTO } from '../../../types/admin/gestionuser/index';

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
// Servicio de usuarios (simplificado a solo lectura)
// -------------------------------------------------
export const userService = {
  /** Obtener todos los usuarios */
  getUsers: async (): Promise<GetUsersDTO[]> => {
    const { data } = await apiClient.get<GetUsersDTO[]>('/GetUsers');
    return data;
  },
};