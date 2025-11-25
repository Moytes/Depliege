import axios from 'axios';
import { UserProfileDto,PatchProfileRequest,ChangePasswordRequest } from '../../../types/user/profile/userProfileTypes';

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

const sha256 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const userProfileService = {
    getUserById: async (id: string): Promise<UserProfileDto> => {
        const { data } = await apiClient.get<UserProfileDto>(`/GetUserById/${id}`);
        return data;
    },

    updateProfile: async (id: string, data: PatchProfileRequest): Promise<void> => {
        await apiClient.patch(`/PatchUser/${id}`, data);
    },

    changePassword: async (id: string, currentPass: string, newPass: string): Promise<void> => {
        const [hashedCurrent, hashedNew] = await Promise.all([
            sha256(currentPass),
            sha256(newPass)
        ]);

        const payload: ChangePasswordRequest = {
            CurrentPassword: hashedCurrent,
            NewPassword: hashedNew,
            ConfirmNewPassword: hashedNew
        };

        await apiClient.patch(`/ChangePassword/${id}`, payload);
    }
};