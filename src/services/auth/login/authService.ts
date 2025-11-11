import axios from 'axios';
import { LoginUserData, LoginResponse, DecodedToken } from '../../../types/auth/login/auth';

// --- MODIFICACIÓN ---
// Leemos la URL base de la API desde las variables de entorno.
// Asumimos Create React App (CRA). Si usas Vite, cambia la línea de abajo.

// Para Create React App (CRA):
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Para Vite: (descomenta la siguiente línea y comenta la de arriba si usas Vite)
// const API_BASE_URL = import.meta.env.VITE_API_URL;

// Esta será la URL completa al endpoint de login
const LOGIN_API_URL = `${API_BASE_URL}/api/User/Login`;

export const loginUser = async (userData: LoginUserData): Promise<LoginResponse> => {
  // Añadimos un chequeo para asegurar que la variable de entorno está cargada
  if (!API_BASE_URL) {
    console.error("Error: La variable de entorno (REACT_APP_API_URL o VITE_API_URL) no está configurada.");
    throw new Error("Error de configuración: La URL del servidor no está disponible.");
  }

  // Usamos la variable construida
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