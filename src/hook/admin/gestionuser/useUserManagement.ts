import { useState, useCallback, useEffect } from 'react';
import { App } from 'antd';
import { userAdminService } from '../../../services/admin/user/userAdminService';
import { GetUsersDto, UserTableData, PatchUserRequest, AddUserRequest } from '../../../types/admin/user/userTypes';

export const useUserManagement = () => {
    const { message, modal } = App.useApp();
    const [users, setUsers] = useState<UserTableData[]>([]);
    const [loading, setLoading] = useState(false);

    const mapToTableData = (data: GetUsersDto[]): UserTableData[] => {
        return data.map(user => ({
            key: user.id,
            id: user.id,
            nombre: user.userName,
            correo: user.mail,
            rol: user.role,
            estatus: user.status,
            verificado: user.verified
        }));
    };

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await userAdminService.getUsers();
            setUsers(mapToTableData(data));
        } catch (error: any) {
            console.error(error);
            message.error('Error al cargar la lista de usuarios.');
        } finally {
            setLoading(false);
        }
    }, [message]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleCreateUser = async (values: any) => {
        setLoading(true);
        try {
            await userAdminService.createUser({
                userName: values.userName,
                mail: values.mail,
                role: values.role,
                rawPassword: values.password 
            });
            message.success('Usuario creado exitosamente');
            fetchUsers(); 
            return true;
        } catch (error: any) {
            const errMsg = error.response?.data?.[0]?.errorMessage || error.response?.data?.errorMessage || 'Error al crear usuario';
            message.error(errMsg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser = async (id: string, values: PatchUserRequest) => {
        setLoading(true);
        try {
            await userAdminService.patchUser(id, values);
            message.success('Usuario actualizado correctamente');
            fetchUsers();
            return true;
        } catch (error: any) {
            const errMsg = error.response?.data?.errorMessage || 'Error al actualizar usuario';
            message.error(errMsg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = (id: string) => {
        modal.confirm({
            title: '¿Inactivar usuario?',
            content: 'El usuario pasará a estado Inactivo y no podrá acceder al sistema.',
            okText: 'Sí, Inactivar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                try {
                    await userAdminService.deleteUser(id);
                    message.success('Usuario inactivado correctamente');
                    fetchUsers();
                } catch (error: any) {
                    message.error('Error al eliminar usuario');
                }
            }
        });
    };

    // Reenviar Código
    const handleResendCode = async (id: string) => {
        try {
            await userAdminService.resendCode(id);
            message.success('Código de verificación reenviado al correo.');
        } catch (error) {
            message.error('No se pudo reenviar el código.');
        }
    };

    return {
        users,
        loading,
        fetchUsers,
        handleCreateUser,
        handleEditUser,
        handleDeleteUser,
        handleResendCode
    };
};