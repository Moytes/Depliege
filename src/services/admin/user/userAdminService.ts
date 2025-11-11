import axios from 'axios';
import {
    AddUserRequest,
    GetUsersDto,
    GetUserDto,
    PatchUserRequest,
    UpdatePasswordRequest,
    VerifyUserRequest,
    ResendCodeRequest
} from '../../../types/admin/user/userTypes';

// 1. Usar la URL base RELATIVA para el proxy, igual que en Login
// Si tu proxy de vite/react está configurado para '/api', esto funcionará.
const API_BASE_URL = '/api/User';

// 2. Crear una instancia de Axios
const apiClient = axios.create({
    baseURL: API_BASE_URL
});

// 3. ¡IMPORTANTE! Añadir el interceptor para el token.
//    Esto usa el 'authToken' que tu LoginView guarda.
apiClient.interceptors.request.use(
    (config) => {
        // Obtenemos el token del localStorage
        const token = localStorage.getItem('authToken');
        
        // Si el token existe, lo añadimos a la cabecera 'Authorization'
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Manejamos errores en la configuración de la petición
        return Promise.reject(error);
    }
);

/**
 * Manejador de errores de Axios, idéntico al de tus otros servicios
 */
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
     // Mejoramos el error para devolver el mensaje del backend si existe
     const apiError = error.response.data;
     let errorMessage = 'Ocurrió un error en la solicitud.';
     
     if (apiError) {
        if (apiError.errorMessage) {
            errorMessage = apiError.errorMessage;
        } else if (apiError.message) {
            errorMessage = apiError.message;
        } else if (Array.isArray(apiError) && apiError.length > 0 && apiError[0].errorMessage) {
            // Maneja la estructura de error de validación (lista de errores)
            errorMessage = apiError.map((err: any) => err.errorMessage).join(', ');
        }
     }
     
     console.error('Error de API:', errorMessage, 'Detalle:', error.response.data);
     throw new Error(errorMessage);
  }
  console.error('Error inesperado:', error);
  throw new Error('Ocurrió un error inesperado en la solicitud.');
};

/**
 * Función helper para hashear contraseñas (igual que en LoginView)
 * La incluimos aquí para que el servicio se encargue del hasheo
 * antes de enviar los datos.
 */
export async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// --- Funciones de API para Gestión de Usuarios ---

/**
 * Endpoint: GET /api/User/GetUsers
 * Obtiene todos los usuarios (Solo Admin)
 */
export const getUsers = async (): Promise<GetUsersDto[]> => {
    try {
        const response = await apiClient.get<GetUsersDto[]>('/GetUsers');
        return response.data;
    } catch (error) {
        handleError(error);
        return []; // Retorno para satisfacer el tipo en caso de error
    }
};

/**
 * Endpoint: POST /api/User/CreateUser
 * Crea un nuevo usuario (Solo Admin)
 * La contraseña se hashea dentro de esta función.
 */
export const createUser = async (userData: Omit<AddUserRequest, 'password'> & { rawPassword: string }): Promise<any> => {
    try {
        const hashedPassword = await sha256(userData.rawPassword);
        const requestData: AddUserRequest = {
            mail: userData.mail,
            userName: userData.userName,
            role: userData.role,
            password: hashedPassword,
        };
        const response = await apiClient.post('/CreateUser', requestData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

/**
 * Endpoint: DELETE /api/User/DeleteUser/{Id}
 * Elimina (baja lógica) un usuario (Solo Admin)
 */
export const deleteUser = async (id: string): Promise<any> => {
    try {
        const response = await apiClient.delete(`/DeleteUser/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

/**
 * Endpoint: GET /api/User/GetUserById/{Id}
 * Obtiene un usuario específico (Admin y Usuario logueado)
 */
export const getUserById = async (id: string): Promise<GetUserDto> => {
    try {
        const response = await apiClient.get<GetUserDto>(`/GetUserById/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

/**
 * Endpoint: PATCH /api/User/PatchUser/{Id}
 * Actualiza Mail y UserName de un usuario (Admin y Usuario logueado)
 */
export const patchUser = async (id: string, userData: PatchUserRequest): Promise<any> => {
    try {
        const response = await apiClient.patch(`/PatchUser/${id}`, userData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

/**
 * Endpoint: PATCH /api/User/ChangePassword/{Id}
 * Cambia la contraseña de un usuario (Admin y Usuario logueado)
 * Las contraseñas se hashean dentro de esta función.
 */
export const changePassword = async (id: string, passData: { current: string, new: string, confirm: string }): Promise<any> => {
    try {
        // Hasheamos todas las contraseñas
        const [hashedCurrent, hashedNew, hashedConfirm] = await Promise.all([
            sha256(passData.current),
            sha256(passData.new),
            sha256(passData.confirm)
        ]);

        const requestData: UpdatePasswordRequest = {
            currentPassword: hashedCurrent,
            newPassword: hashedNew,
            confirmNewPassword: hashedConfirm,
        };
        
        const response = await apiClient.patch(`/ChangePassword/${id}`, requestData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

/**
 * Endpoint: POST /api/User/VerifyUserAccount
 * Verifica la cuenta de un usuario (Admin y Usuario logueado)
 */
export const verifyUserAccount = async (verifyData: VerifyUserRequest): Promise<any> => {
    try {
        const response = await apiClient.post('/VerifyUserAccount', verifyData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

/**
 * Endpoint: POST /api/User/ResendVerificationCode
 * Reenvía el código de verificación (Admin y Usuario logueado)
 */
export const resendVerificationCode = async (resendData: ResendCodeRequest): Promise<any> => {
    try {
        const response = await apiClient.post('/ResendVerificationCode', resendData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};