import axios from 'axios';
import { LoginUserData, LoginResponse, DecodedToken } from '../../../types/auth/login/auth';

// --- MODIFICACIÓN ---
// Para Create React App (CRA):
const API_BASE_URL = process.env.REACT_APP_API_URL;

// --- LOG DE DEPURACIÓN 1 ---
// Esto se registrará en la consola del navegador TAN PRONTO se cargue la app.
// Te dirá qué valor se "horneó" (baked in) durante el build en GitHub.
console.log("AuthService: Valor de REACT_APP_API_URL (al cargar):", API_BASE_URL);

const isValidHttpUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

// Construye la URL del endpoint
const LOGIN_API_URL = `${API_BASE_URL}/api/User/Login`;

export const loginUser = async (userData: LoginUserData): Promise<LoginResponse> => {

  // --- LOG DE DEPURACIÓN 2 (El que pediste) ---
  // Muestra la URL completa que se intentará usar CADA VEZ que se presione "Login".
  console.log("AuthService: Intentando POST a la ruta:", LOGIN_API_URL);

  // --- VALIDACIÓN MEJORADA ---
  // Revisa si la URL base es válida *antes* de hacer la llamada.
  if (!isValidHttpUrl(API_BASE_URL)) {
    console.error("AuthService: Error FATAL: La URL base no es válida o no está configurada.");
    console.error("AuthService: El valor de API_BASE_URL es:", API_BASE_URL);
    // Lanzamos un error claro para que no se ejecute el axios
    throw new Error("Error de configuración: La URL del servidor no es válida.");
  }

  // Usamos la variable construida
  // Si la validación de arriba falla, esta línea nunca se ejecuta.
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