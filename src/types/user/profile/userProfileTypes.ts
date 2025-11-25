export interface UserProfileDto {
    userName: string;
    mail: string;
}

export interface UserProfileFormValues {
    userName: string;
    mail: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export interface PatchProfileRequest {
    UserName: string;
    Mail: string;
}

export interface ChangePasswordRequest {
    CurrentPassword: string;
    NewPassword: string;
    ConfirmNewPassword: string;
}