// hooks/useUserManagement.ts
import React from 'react';
import { App } from 'antd';
import { GetUsersDTO } from '../../../../../types/admin/gestionuser/index';
import { userService } from '../../../../../services/admin/gestionuser/userService';

/**
 * Tipo de datos que espera la tabla de AntDesign.
 */
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

      // --- ✅ CORRECCIÓN ---
      // Leemos las propiedades en camelCase (id, userName, mail, role)
      // que nos envía el backend de ASP.NET.
      const mappedUsers: UserTableData[] = usersFromApi.map(
        (user: GetUsersDTO) => ({
          key: user.id,
          nombre: user.userName,
          correo: user.mail,
          rol: user.role,
        })
      );
      // --- Fin de la corrección ---

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

  // Retornamos solo lo que la tabla necesita
  return {
    users,
    loading,
  };
};