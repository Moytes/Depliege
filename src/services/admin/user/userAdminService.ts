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

const API_URL = 'https://api-scci.happyglacier-792390d3.westus2.azurecontainerapps.io/api/User';

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

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
        const response = await axios.get<GetUsersDto[]>(`${API_URL}/GetUsers`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
        return [];
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
        const response = await axios.post(`${API_URL}/CreateUser`, requestData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const deleteUser = async (id: string): Promise<any> => {
    try {
        const response = await axios.delete(`${API_URL}/DeleteUser/${id}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getUserById = async (id: string): Promise<GetUserDto> => {
    try {
        const response = await axios.get<GetUserDto>(`${API_URL}/GetUserById/${id}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const patchUser = async (id: string, userData: PatchUserRequest): Promise<any> => {
    try {
        const response = await axios.patch(`${API_URL}/PatchUser/${id}`, userData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const changePassword = async (id: string, passData: { current: string, new: string, confirm: string }): Promise<any> => {
    try {
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
        
        const response = await axios.patch(`${API_URL}/ChangePassword/${id}`, requestData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const verifyUserAccount = async (verifyData: VerifyUserRequest): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/VerifyUserAccount`, verifyData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const resendVerificationCode = async (resendData: ResendCodeRequest): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/ResendVerificationCode`, resendData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};