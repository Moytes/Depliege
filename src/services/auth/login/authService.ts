import axios from 'axios';
import { LoginUserData, LoginResponse, DecodedToken } from '../../../types/auth/login/auth';

// Usar variable de entorno con valor por defecto
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api-scci.happyglacier-792390d3.westus2.azurecontainerapps.io';
const API_URL = `${API_BASE_URL}/api/User/Login`;

// Configurar axios con timeout
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
  }
});

export const loginUser = async (userData: LoginUserData): Promise<LoginResponse> => {
  console.log('🔍 Intentando login en:', API_URL);
  console.log('📤 Datos enviados:', { ...userData, password: '***' }); // No loguear password real
  
  try {
    const response = await apiClient.post<LoginResponse>('/api/User/Login', userData);
    console.log('✅ Login exitoso');
    return response.data;
  } catch (error) {
    console.error('❌ Error en login:', error);
    throw error;
  }
};

export const saveToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const logoutUser = (): void => {
  localStorage.removeItem('authToken');
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};