import axios from 'axios';
import { 
    GetUsersDto, 
    AddUserRequest, 
    PatchUserRequest, 
    ResendCodeRequest 
} from '../../../types/admin/user/userTypes';

const API_URL = `${process.env.REACT_APP_API_URL}/api/User`;

const apiClient = axios.create({
    baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
             console.warn("Sesión expirada o no autorizada");
        }
        return Promise.reject(error);
    }
);

const sha256 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};


export const userAdminService = {
    getUsers: async (): Promise<GetUsersDto[]> => {
        const { data } = await apiClient.get<GetUsersDto[]>('/GetUsers');
        return data;
    },

    createUser: async (userData: Omit<AddUserRequest, 'password'> & { rawPassword: string }): Promise<string> => {
        const hashedPassword = await sha256(userData.rawPassword);
        
        const payload: AddUserRequest = {
            mail: userData.mail,
            userName: userData.userName,
            role: userData.role,
            password: hashedPassword
        };

        const { data } = await apiClient.post('/CreateUser', payload);
        return data;
    },

    patchUser: async (id: string, userData: PatchUserRequest): Promise<void> => {
        await apiClient.patch(`/PatchUser/${id}`, userData);
    },

    deleteUser: async (id: string): Promise<void> => {
        await apiClient.delete(`/DeleteUser/${id}`);
    },

    resendCode: async (userId: string): Promise<void> => {
        const payload: ResendCodeRequest = { userId };
        await apiClient.post('/ResendVerificationCode', payload);
    }
};