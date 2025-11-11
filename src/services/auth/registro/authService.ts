// 📍 Ubicación CORRECTA: src/services/auth/registro/authService.ts

import axios from 'axios';
// Desde esta ubicación, ../../../types/ SÍ funciona
import { RegisterUserData } from '../../../types/auth/registro/auth';
import { VerifyAccountData, ResendCodeData } from '../../../types/auth/registro/verify/auth';

// Esta URL es la de tu API en Azure
const API_URL = 'https://api-scci.happyglacier-792390d3.westus2.azurecontainerapps.io/api/User';

/**
 * Registra un nuevo usuario.
 */
export const registerUser = async (userData: RegisterUserData) => {
    try {
        const response = await axios.post(`${API_URL}/RegisterUser`, userData);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado al intentar registrar el usuario.');
    }
};

/**
 * Verifica la cuenta de un usuario con el código.
 * NOTA: Requiere que el usuario esté logueado (tenga un token JWT).
 */
export const verifyUserAccount = async (data: VerifyAccountData) => {
    try {
        const response = await axios.post(`${API_URL}/VerifyUserAccount`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado al verificar la cuenta.');
    }
};

/**
 * Reenvía el código de verificación.
 * NOTA: Requiere que el usuario esté logueado (tenga un token JWT).
 */
export const resendVerificationCode = async (data: ResendCodeData) => {
    try {
        const response = await axios.post(`${API_URL}/ResendVerificationCode`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado al reenviar el código.');
    }
};