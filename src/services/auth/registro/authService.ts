import axios from 'axios';
import { RegisterUserData } from '../../../types/auth/registro/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL;

console.log("RegisterService: Valor de REACT_APP_API_URL:", API_BASE_URL);

const isValidHttpUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

const REGISTER_API_URL = `${API_BASE_URL}/api/User/RegisterUser`;

export const registerUser = async (userData: RegisterUserData) => {
    
    console.log("RegisterService: Intentando POST a:", REGISTER_API_URL);

    if (!isValidHttpUrl(API_BASE_URL)) {
        console.error("RegisterService: Error FATAL: La URL base no es válida o no está configurada.");
        throw new Error("Error de configuración: La URL del servidor no es válida.");
    }

    try {
        const response = await axios.post(REGISTER_API_URL, userData);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado al intentar registrar el usuario.');
    }
};