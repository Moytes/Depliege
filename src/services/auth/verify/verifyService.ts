import axios from 'axios';
import { VerifyAccountData, ResendCodeData } from '../../../types/auth/registro/verify/auth';

const API_URL = 'https://api-scci.happyglacier-792390d3.westus2.azurecontainerapps.io/api/User';

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
    try {
        const response = await axios.post(
            `${API_URL}/VerifyUserAccount`, 
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
    try {
        const response = await axios.post(
            `${API_URL}/ResendVerificationCode`, 
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