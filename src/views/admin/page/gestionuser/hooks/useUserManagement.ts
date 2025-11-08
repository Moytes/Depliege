import React from 'react';
import { App } from 'antd';
import { GetUsersDTO } from '../../../../../types/admin/gestionuser/index';
import { userService } from '../../../../../services/admin/gestionuser/userService';

export interface UserTableData {
  key: string;
  nombre: string;
  correo: string;
  rol: string;
}

export const useUserManagement = () => {
  const { message } = App.useApp();
  const [users, setUsers] = React.useState<UserTableData[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      const usersFromApi = await userService.getUsers();
      const mappedUsers: UserTableData[] = usersFromApi.map(
        (user: GetUsersDTO) => ({
          key: user.id,
          nombre: user.userName,
          correo: user.mail,
          rol: user.role,
        })
      );

      setUsers(mappedUsers);
    } catch (error: any) {
      console.error('Error al obtener usuarios:', error);
      const errorMessage =
        error.response?.data?.errorMessage ||
        'No se pudieron cargar los usuarios.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [message]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
  };
};