import { useState, useEffect, useCallback } from 'react';
import { App } from 'antd';
import { adminProfileService } from '../../../services/admin/profile/adminProfileService';
import { UserProfileDto, UpdateProfileRequest } from '../../../types/admin/profile/profileTypes';

const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const useAdminProfile = () => {
    const { message } = App.useApp();
    const [user, setUser] = useState<UserProfileDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = parseJwt(token);
            const idFromToken = decoded?.sub || decoded?.nameid;
            if (idFromToken) {
                setUserId(idFromToken);
            }
        }
    }, []);

    const fetchProfile = useCallback(async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const data = await adminProfileService.getProfile(userId);
            setUser(data);
        } catch (error) {
            message.error('Error al cargar información del perfil.');
        } finally {
            setLoading(false);
        }
    }, [userId, message]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleUpdateInfo = async (values: UpdateProfileRequest) => {
        if (!userId) return false;
        setLoading(true);
        try {
            await adminProfileService.updateProfile(userId, values);
            message.success('Información actualizada correctamente.');
            fetchProfile();
            return true;
        } catch (error: any) {
            const msg = error.response?.data?.errorMessage || 'Error al actualizar perfil.';
            message.error(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (currentPass: string, newPass: string) => {
        if (!userId) return false;
        setLoading(true);
        try {
            await adminProfileService.changePassword(userId, currentPass, newPass);
            message.success('Contraseña actualizada exitosamente.');
            return true;
        } catch (error: any) {
            const msg = error.response?.data?.errorMessage || 'Error al cambiar contraseña. Verifica tu contraseña actual.';
            message.error(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        handleUpdateInfo,
        handleChangePassword
    };
};