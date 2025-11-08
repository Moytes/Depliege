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
  const { users, loading } = useUserManagement();

  const columns: TableProps<UserTableData>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'nombre', 
      key: 'nombre',
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: 'Correo Electrónico',
      dataIndex: 'correo',
      key: 'correo',
      responsive: ['sm'],
    },
    {
      title: 'Rol',
      dataIndex: 'rol', 
      key: 'rol',
      responsive: ['md'],
      sorter: (a, b) => a.rol.localeCompare(b.rol),
      render: (rol: string) => {
        const color = rol.toLowerCase().includes('admin') ? 'red' : 'blue';
        return (
          <Tag color={color} key={rol}>
            {rol.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <Card
      title={
        <Title level={2} style={{ margin: 0 }}>
          Gestión de Usuarios
        </Title>
      }
    >
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
  );
};