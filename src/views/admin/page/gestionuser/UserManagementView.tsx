// UserManagementView.tsx
import React from 'react';
// Añadimos Tag a las importaciones
import { Table, Card, Typography, Tag } from 'antd';
import type { TableProps } from 'antd';
// Importamos el hook simplificado y su tipo de datos
import {
  useUserManagement,
  UserTableData,
} from './hooks/useUserManagement';

const { Title } = Typography;

export const UserManagementView: React.FC = () => {
  // El hook ahora solo devuelve 'users' y 'loading'
  const { users, loading } = useUserManagement();

  // Columnas simplificadas para coincidir con el requisito
  const columns: TableProps<UserTableData>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'nombre', // Coincide con UserTableData
      key: 'nombre',
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: 'Correo Electrónico',
      dataIndex: 'correo', // Coincide con UserTableData
      key: 'correo',
      responsive: ['sm'],
    },
    {
      title: 'Rol',
      dataIndex: 'rol', // Coincide con UserTableData
      key: 'rol',
      responsive: ['md'],
      sorter: (a, b) => a.rol.localeCompare(b.rol),
      // --- ✅ MEJORA DE DISEÑO ---
      // Añadimos un render para mostrar Tags de colores
      render: (rol: string) => {
        // Asignamos un color basado en el texto del rol
        const color = rol.toLowerCase().includes('admin') ? 'red' : 'blue';
        return (
          <Tag color={color} key={rol}>
            {rol.toUpperCase()}
          </Tag>
        );
      },
      // --- Fin de la mejora ---
    },
  ];

  return (
    // --- ✅ MEJORA DE DISEÑO ---
    // Movemos el Título al 'title' prop de la Card para un diseño más limpio
    <Card
      title={
        <Title level={2} style={{ margin: 0 }}>
          Gestión de Usuarios
        </Title>
      }
    >
      {/* La tabla ahora es el único elemento interactivo */}
      <Table
        columns={columns}
        dataSource={users}
        rowKey="key"
        loading={loading}
        scroll={{ x: 600 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} usuarios`,
        }}
        locale={{
          emptyText: 'No hay usuarios registrados',
        }}
      />
    </Card>
    // --- Fin de la mejora ---
  );
};