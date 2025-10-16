import axios from 'axios';
import { RegisterUserData } from '../../../types/auth/registro/auth';

const API_URL = '/api/User';

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