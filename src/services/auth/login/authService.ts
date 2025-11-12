import axios from 'axios';
import { LoginUserData, LoginResponse, DecodedToken } from '../../../types/auth/login/auth';

const API_BASE_URL = 'https://api-scci.happyglacier-792390d3.westus2.azurecontainerapps.io';


const LOGIN_API_URL = `${API_BASE_URL}/api/User/Login`;

export const loginUser = async (userData: LoginUserData): Promise<LoginResponse> => {

  // 4. Se eliminó la validación y los logs de la función
  const response = await axios.post<LoginResponse>(LOGIN_API_URL, userData);
  return response.data;
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