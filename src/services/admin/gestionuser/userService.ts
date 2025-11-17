import axios from 'axios';
import { GetUsersDto } from '../../../types/admin/user/userTypes'; // Usa tipos consistentes de userTypes.ts (role: number)

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Consistente con otros servicios

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export const userService = {
  getUsers: async (): Promise<GetUsersDto[]> => {
    try {
      const { data } = await apiClient.get<GetUsersDto[]>('/api/User/GetUsers');
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // O retorna [] si prefieres un fallback silencioso
    }
  },
};