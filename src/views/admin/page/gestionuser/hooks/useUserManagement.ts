import React from 'react';
import { App } from 'antd';
import { 
    UserDTO, 
    UserTableType, 
    ROLES, 
    CreateUserRequest, 
    UpdateUserRequest, 
    UpdatePasswordRequest, // Importado
    isAdmin 
} from '../../../../../types/admin/gestionuser/index';
import { userService, sha256 } from '../../../../../services/admin/gestionuser/userService';

const mapUserDTOToTableType = (user: UserDTO): UserTableType => ({
    key: user.id,
    id: user.id,
    name: user.userName,
    email: user.email,
    role: ROLES[user.role] || 'Desconocido',
    roleId: user.role,
});

export const useUserManagement = () => {
    const { message } = App.useApp();
    const [filteredUsers, setFilteredUsers] = React.useState<UserTableType[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<UserTableType | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState<{ id: string; role: number } | null>(null);

    // Obtener información del usuario actual desde el token
    React.useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setCurrentUser({
                    id: payload.sub,
                    role: parseInt(payload.rol, 10)
                });
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const fetchUsers = React.useCallback(async () => {
        setLoading(true);
        try {
            const usersFromApi = await userService.getUsers();
            const mappedUsers = usersFromApi.map(mapUserDTOToTableType);
            setFilteredUsers(mappedUsers);
        } catch (error: any) {
            console.error("Error al obtener usuarios:", error);
            const errorMessage = error.response?.data?.errorMessage || 'No se pudieron cargar los usuarios.';
            message.error(errorMessage);
            
            if (error.response?.status === 403) {
                setTimeout(() => window.location.href = '/unauthorized', 2000);
            }
        } finally {
            setLoading(false);
        }
    }, [message]);

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async (id: string) => {
        // Verificar permisos - solo admin puede eliminar
        if (!currentUser || !isAdmin(currentUser.role)) {
            message.error('No tienes permisos para eliminar usuarios.');
            return;
        }

        // Prevenir que el admin se elimine a sí mismo
        if (currentUser.id === id) {
            message.error('No puedes eliminar tu propio usuario.');
            return;
        }

        // REMOVIDO: El check para prevenir eliminar otros admins
        // Ahora permite eliminar cualquier usuario (si es admin)

        try {
            await userService.deleteUser(id);
            message.success('Usuario eliminado correctamente');
            fetchUsers();
        } catch (error: any) {
            console.error('Error en eliminación:', error); // Logging para depurar
            const errorMessage = error.response?.data?.errorMessage || error.response?.data?.message || 'No se pudo eliminar el usuario. Verifica la consola para más detalles.';
            message.error(errorMessage);
        }
    };

    const showAddModal = () => {
        if (!currentUser || !isAdmin(currentUser.role)) {
            message.error('Solo los administradores pueden crear usuarios.');
            return;
        }
        setEditingUser(null);
        setIsModalVisible(true);
    };

    const showEditModal = (user: UserTableType) => {
        if (!currentUser) return;

        if (!isAdmin(currentUser.role) && currentUser.id !== user.id) {
            message.error('Solo puedes editar tu propio perfil.');
            return;
        }

        setEditingUser(user);
        setIsModalVisible(true);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
        setEditingUser(null);
    };

    const handleFormFinish = async (values: any) => {
        setIsSubmitting(true);
        const isAdminEditing = isAdmin(currentUser?.role || 2);

        if (!values.name || !values.email) {
            message.error('El nombre y el correo son obligatorios.');
            setIsSubmitting(false);
            return;
        }

        if (editingUser) {
            if (values.password || values.confirmPassword) {
                if (values.password !== values.confirmPassword) {
                    message.error('Las nuevas contraseñas no coinciden.');
                    setIsSubmitting(false);
                    return;
                }
                if (!isAdminEditing && !values.currentPassword) {
                    message.error('La contraseña actual es obligatoria para cambiar la contraseña.');
                    setIsSubmitting(false);
                    return;
                }
            }

            try {
                const payload: UpdateUserRequest = { 
                    UserName: values.name, 
                    Mail: values.email 
                };

                if (isAdminEditing) {
                    payload.Role = values.role;
                }

                await userService.updateUser(editingUser.id, payload);

                if (values.password) {
                    const hashedCurrent = values.currentPassword ? await sha256(values.currentPassword) : undefined;
                    const hashedNew = await sha256(values.password);
                    const passwordPayload: UpdatePasswordRequest = {
                        CurrentPassword: hashedCurrent,
                        NewPassword: hashedNew,
                        ConfirmNewPassword: hashedNew
                    };
                    await userService.changePassword(editingUser.id, passwordPayload);
                }

                message.success('Usuario actualizado correctamente');
                handleCancelModal();
                fetchUsers();
            
            } catch (error: any) {
                const errors = error.response?.data;
                let errorMessage = 'Ocurrió un error al actualizar.';
                if (Array.isArray(errors)) {
                    errorMessage = errors.map(e => `${e.error}: ${e.errorMessage}`).join(', ');
                } else if (error.response?.data?.errorMessage) {
                    errorMessage = error.response.data.errorMessage;
                }
                message.error(errorMessage);
            } finally {
                setIsSubmitting(false);
            }

        } else {
            if (!values.password || !values.confirmPassword) {
                message.error('La contraseña y su confirmación son obligatorias al crear un usuario.');
                setIsSubmitting(false);
                return;
            }

            if (values.password !== values.confirmPassword) {
                message.error('Las contraseñas no coinciden.');
                setIsSubmitting(false);
                return;
            }

            if (!isAdminEditing) {
                message.error('No tienes permisos para crear usuarios.');
                setIsSubmitting(false);
                return;
            }

            try {
                const hashedPassword = await sha256(values.password);
                const payload: CreateUserRequest = { 
                    UserName: values.name, 
                    Mail: values.email, 
                    Password: hashedPassword, 
                    Role: values.role 
                };
                
                await userService.createUser(payload);
                message.success('Usuario creado correctamente');
                handleCancelModal();
                fetchUsers();
            
            } catch (error: any) {
                const errors = error.response?.data;
                let errorMessage = 'Ocurrió un error al crear.';
                if (Array.isArray(errors)) {
                    errorMessage = errors.map(e => `${e.error}: ${e.errorMessage}`).join(', ');
                } else if (error.response?.data?.errorMessage) {
                    errorMessage = error.response.data.errorMessage;
                }
                message.error(errorMessage);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const canCreateUsers = Boolean(currentUser && isAdmin(currentUser.role));
    const canDeleteUsers = Boolean(currentUser && isAdmin(currentUser.role));
    const canEditAllUsers = Boolean(currentUser && isAdmin(currentUser.role));

    return {
        filteredUsers,
        loading,
        isModalVisible,
        editingUser,
        isSubmitting,
        currentUser,
        canCreateUsers,
        canDeleteUsers,
        canEditAllUsers,
        handleDelete,
        showAddModal,
        showEditModal,
        handleCancelModal,
        handleFormFinish,
    };
};