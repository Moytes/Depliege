import axios from 'axios';
// Esta es la ruta correcta para RegisterUserData según tu 'ls'
import { RegisterUserData } from '../types/auth/registro/auth';
// Esta es la ruta correcta para los tipos de verificación según tu 'ls'
import { VerifyAccountData, ResendCodeData } from '../types/auth/registro/verify/auth';

// Esta URL es la de tu API en Azure
const API_URL = 'https://api-scci.happyglacier-792390d3.westus2.azurecontainerapps.io/api/User';

/**
 * Registra un nuevo usuario.
 */
export const registerUser = async (userData: RegisterUserData) => {
    try {
        // Llama al endpoint "RegisterUser" que es [AllowAnonymous]
        const response = await axios.post(`${API_URL}/RegisterUser`, userData);
        
        // --- INICIO DE LA CORRECCIÓN ---
        // El backend devuelve el ID en el encabezado 'Location', no en el body.
        // Location: ".../api/User/GetUserById/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        
        const locationHeader = response.headers['location'] || '';
        const urlParts = locationHeader.split('/');
        const newUserId = urlParts[urlParts.length - 1]; // Obtenemos la última parte (el GUID)

        // Devolvemos un objeto combinado que incluye el body (response.data) y el newUserId
        return {
            ...(response.data || {}), // Esto expande el { message: "..." }
            id: newUserId // Añadimos el ID que el hook 'useRegisterForm' espera
        };
        // --- FIN DE LA CORRECCIÓN ---

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Si es un 409 o 400, error.response.data contendrá el objeto { error, errorMessage }
            throw error.response.data;
        }
        // Error inesperado (ej. red)
        throw new Error('Ocurrió un error inesperado al intentar registrar el usuario.');
    }
};

/**
 * Verifica la cuenta de un usuario con el código.
 * NOTA: Esto asume que el endpoint [VerifyUserAccount] se ha cambiado a [AllowAnonymous]
 */
export const verifyUserAccount = async (data: VerifyAccountData) => {
    try {
        const response = await axios.post(`${API_URL}/VerifyUserAccount`, data);
        return response.data; // Devuelve { message = "Cuenta verificada correctamente" }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data; // Ej: { error: "VerificationFailed", ... }
        }
        throw new Error('Ocurrió un error inesperado al verificar la cuenta.');
    }
};

/**
 * Reenvía el código de verificación.
 * NOTA: Esto asume que el endpoint [ResendVerificationCode] se ha cambiado a [AllowAnonymous]
 */
export const resendVerificationCode = async (data: ResendCodeData) => {
    try {
        const response = await axios.post(`${API_URL}/ResendVerificationCode`, data);
        return response.data; // Devuelve { message = "Código de verificación reenviado..." }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado al reenviar el código.');
    }
};