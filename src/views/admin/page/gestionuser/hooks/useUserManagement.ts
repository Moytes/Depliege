import React from 'react';
import { App } from 'antd';
import { GetUsersDto } from '../../../../../types/admin/user/userTypes'; // Usa tipos consistentes (role: number)
import { getUsers } from '../../../../../services/admin/user/userAdminService'; // Cambia a userAdminService para estandarizar; elimina userService si no se usa

export interface UserTableData {
  key: string;
  nombre: string;
  correo: string;
  rol: number; // number
}

export const useUserManagement = () => {
  const { message } = App.useApp();
  const [users, setUsers] = React.useState<UserTableData[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      const usersFromApi = await getUsers(); // Ahora usa el servicio estandarizado
      const mappedUsers: UserTableData[] = usersFromApi.map(
        (user: GetUsersDto) => ({
          key: user.id,
          nombre: user.userName,
          correo: user.mail,
          rol: user.role, // number
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