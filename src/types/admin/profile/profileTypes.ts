import { Roles, Status } from '../user/userTypes';

export interface UserProfileDto {
    id: string;
    mail: string;
    userName: string;
    role: number;
    status: number;
    verified: number;
}

export interface UpdateProfileRequest {
    mail: string;
    userName: string;
}

export interface ChangePasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangePasswordApiRequest {
    CurrentPassword: string;
    NewPassword: string;
    ConfirmNewPassword: string;
}