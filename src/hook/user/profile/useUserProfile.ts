import { useState, useEffect, useCallback } from 'react';
import { App, Form } from 'antd';
import { userProfileService } from '../../../services/user/profile/userProfileService';
import { UserProfileDto, UserProfileFormValues } from '../../../types/user/profile/userProfileTypes';

const decodeToken = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const useUserProfile = () => {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    
    const [userData, setUserData] = useState<UserProfileDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = decodeToken(token);
            const id = decoded?.nameid || decoded?.sub;
            if (id) setUserId(id);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const data = await userProfileService.getUserById(userId);
            setUserData(data);
            form.setFieldsValue({
                userName: data.userName,
                mail: data.mail
            });
        } catch (error) {
            message.error('Error al cargar perfil.');
        } finally {
            setLoading(false);
        }
    }, [userId, form, message]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleUpdate = async (values: UserProfileFormValues) => {
        if (!userId) return;
        setIsUpdating(true);

        const hasProfileChanged = values.userName !== userData?.userName || values.mail !== userData?.mail;
        const isPasswordAttempt = !!(values.currentPassword && values.newPassword);

        if (!hasProfileChanged && !isPasswordAttempt) {
            message.info('No hay cambios para guardar.');
            setIsUpdating(false);
            return;
        }

        try {
            if (hasProfileChanged) {
                await userProfileService.updateProfile(userId, {
                    UserName: values.userName,
                    Mail: values.mail
                });
                setUserData({ userName: values.userName, mail: values.mail });
                message.success('Información de perfil actualizada.');
            }

            if (isPasswordAttempt) {
                if (!values.currentPassword || !values.newPassword) return;
                
                await userProfileService.changePassword(userId, values.currentPassword, values.newPassword);
                message.success('Contraseña actualizada correctamente.');
                
                form.setFieldsValue({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setShowPasswordFields(false);
            }

        } catch (error: any) {
            console.error(error);
            const apiError = error.response?.data?.errorMessage || 
                             error.response?.data?.message || 
                             'Ocurrió un error al actualizar.';
            
            if (error.response?.status === 409) {
                message.error('El correo o nombre de usuario ya está en uso.');
            } else {
                message.error(apiError);
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        form,
        userData,
        loading,
        isUpdating,
        showPasswordFields,
        setShowPasswordFields,
        handleUpdate
    };
};