import React from 'react';
import { App } from 'antd';
import { UserDTO, UserTableType, ROLES } from '../../../../../types/admin/gestionuser/index';
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
    const [allUsers, setAllUsers] = React.useState<UserTableType[]>([]);
    const [filteredUsers, setFilteredUsers] = React.useState<UserTableType[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<UserTableType | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const fetchUsers = React.useCallback(async () => {
        setLoading(true);
        try {
            const usersFromApi = await userService.getUsers();
            const mappedUsers = usersFromApi.map(mapUserDTOToTableType);
            setAllUsers(mappedUsers);
            setFilteredUsers(mappedUsers);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            message.error('No se pudieron cargar los usuarios.');
        } finally {
            setLoading(false);
        }
    }, [message]);

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = (value: string) => {
        const lowercasedValue = value.toLowerCase();
        const filtered = allUsers.filter(user =>
            user.name.toLowerCase().includes(lowercasedValue) ||
            user.email.toLowerCase().includes(lowercasedValue)
        );
        setFilteredUsers(filtered);
    };

    const handleDelete = async (id: string) => {
        try {
            await userService.deleteUser(id);
            message.success('Usuario eliminado correctamente');
            fetchUsers();
        } catch (error) {
            message.error('No se pudo eliminar el usuario.');
        }
    };

    const showAddModal = () => {
        setEditingUser(null);
        setIsModalVisible(true);
    };

    const showEditModal = (user: UserTableType) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
        setEditingUser(null);
    };

    const handleFormFinish = async (values: any) => {
        setIsSubmitting(true);
        try {
            if (editingUser) {
                const payload = { userName: values.name, mail: values.email, role: values.role };
                await userService.updateUser(editingUser.id, payload);
                message.success('Usuario actualizado correctamente');
            } else {
                const hashedPassword = await sha256(values.password);
                const payload = { userName: values.name, mail: values.email, password: hashedPassword, role: values.role };
                await userService.createUser(payload);
                message.success('Usuario creado correctamente');
            }
            handleCancelModal();
            fetchUsers();
        } catch (error: any) {
            const errorMessage = error.response?.data?.errorMessage || 'Ocurrió un error al guardar.';
            message.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        filteredUsers,
        loading,
        isModalVisible,
        editingUser,
        isSubmitting,
        handleSearch,
        handleDelete,
        showAddModal,
        showEditModal,
        handleCancelModal,
        handleFormFinish,
    };
};