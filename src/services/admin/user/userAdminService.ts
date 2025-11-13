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

const API_BASE_URL = '/api/User';

const apiClient = axios.create({
    baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const handleError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
     const apiError = error.response.data;
     let errorMessage = 'Ocurrió un error en la solicitud.';
     
     if (apiError) {
        if (apiError.errorMessage) {
            errorMessage = apiError.errorMessage;
        } else if (apiError.message) {
            errorMessage = apiError.message;
        } else if (Array.isArray(apiError) && apiError.length > 0 && apiError[0].errorMessage) {
            errorMessage = apiError.map((err: any) => err.errorMessage).join(', ');
        }
     }
     
     console.error('Error de API:', errorMessage, 'Detalle:', error.response.data);
     throw new Error(errorMessage);
  }
  console.error('Error inesperado:', error);
  throw new Error('Ocurrió un error inesperado en la solicitud.');
};


export async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export const getUsers = async (): Promise<GetUsersDto[]> => {
    try {
        const response = await apiClient.get<GetUsersDto[]>('/GetUsers');
        return response.data;
    } catch (error) {
        handleError(error);
        return []; // Retorno para satisfacer el tipo en caso de error
    }
};


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

export const deleteUser = async (id: string): Promise<any> => {
    try {
        const response = await apiClient.delete(`/DeleteUser/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};


export const getUserById = async (id: string): Promise<GetUserDto> => {
    try {
        const response = await apiClient.get<GetUserDto>(`/GetUserById/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const patchUser = async (id: string, userData: PatchUserRequest): Promise<any> => {
    try {
        const response = await apiClient.patch(`/PatchUser/${id}`, userData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};


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


export const verifyUserAccount = async (verifyData: VerifyUserRequest): Promise<any> => {
    try {
        const response = await apiClient.post('/VerifyUserAccount', verifyData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};


export const resendVerificationCode = async (resendData: ResendCodeRequest): Promise<any> => {
    try {
        const response = await apiClient.post('/ResendVerificationCode', resendData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};