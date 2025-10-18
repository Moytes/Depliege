import React from 'react';
import { Table, Button, Input, Space, Popconfirm, Typography, Card, Flex, Grid } from 'antd';
import type { TableProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUserManagement } from './hooks/useUserManagement';
import { UserFormModal } from './formulariomodal/UserFormModal';
import { UserTableType, ROLES } from '../../../../types/admin/gestionuser/index';

const { Search } = Input;
const { Title } = Typography;

export const UserManagementView: React.FC = () => {
    const screens = Grid.useBreakpoint();
    const {
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
    } = useUserManagement();

    const columns: TableProps<UserTableType>['columns'] = [
        { title: 'Nombre', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: 'Correo Electrónico', dataIndex: 'email', key: 'email', responsive: ['sm'] },
        {
            title: 'Rol', dataIndex: 'role', key: 'role', responsive: ['md'],
            filters: Object.values(ROLES).map(role => ({ text: role, value: role })),
            onFilter: (value, record) => record.role.indexOf(value as string) === 0,
        },
        {
            title: 'Acciones', key: 'actions', fixed: 'right', width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => showEditModal(record)}>Editar</Button>
                    <Popconfirm
                        title="¿Eliminar este usuario?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Sí" cancelText="No"
                    >
                        <Button type="link" danger>Eliminar</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={2}>Gestión de Usuarios</Title>
                <Flex vertical={!screens.md} justify="space-between" align="center" wrap="wrap" gap="middle">
                    <Search
                        placeholder="Buscar por nombre o correo"
                        onSearch={handleSearch}
                        style={{ width: screens.sm ? 300 : '100%' }}
                        allowClear
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal} style={{ width: !screens.md ? '100%' : 'auto' }}>
                        Agregar Usuario
                    </Button>
                </Flex>
                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="key"
                    loading={loading}
                    scroll={{ x: true }}
                />
            </Space>

            <UserFormModal
                open={isModalVisible}
                onCancel={handleCancelModal}
                onFinish={handleFormFinish}
                editingUser={editingUser}
                isSubmitting={isSubmitting}
            />
        </Card>
    );
};