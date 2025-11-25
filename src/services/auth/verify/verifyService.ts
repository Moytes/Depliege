import axios from 'axios';
import { VerifyAccountData, ResendCodeData } from '../../../types/auth/registro/verify/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL;

console.log("VerifyService: Valor de REACT_APP_API_URL:", API_BASE_URL);

const isValidHttpUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

const USER_API_URL = `${API_BASE_URL}/api/User`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error("verifyService: No se encontró authToken en localStorage.");
        return {};
    }

    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

export const verifyUserAccount = async (data: VerifyAccountData) => {
    if (!isValidHttpUrl(API_BASE_URL)) {
        console.error("VerifyService: Error FATAL: La URL base no es válida o no está configurada.");
        throw new Error("Error de configuración: La URL del servidor no es válida.");
    }

    try {
        const response = await axios.post(
            `${USER_API_URL}/VerifyUserAccount`, 
            data, 
            getAuthHeaders() 
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado al verificar la cuenta.');
    }
};

export const resendVerificationCode = async (data: ResendCodeData) => {
    if (!isValidHttpUrl(API_BASE_URL)) {
        console.error("VerifyService: Error FATAL: La URL base no es válida o no está configurada.");
        throw new Error("Error de configuración: La URL del servidor no es válida.");
    }

    try {
        const response = await axios.post(
            `${USER_API_URL}/ResendVerificationCode`, 
            data, 
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado al reenviar el código.');
    }
};