import React from 'react';
import { Table, Button, Space, Popconfirm, Typography, Card, Flex, Grid, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useUserManagement } from './hooks/useUserManagement';
import { UserFormModal } from './formulariomodal/UserFormModal';
import { UserTableType, ROLES, isAdmin } from '../../../../types/admin/gestionuser/index';

const { Title } = Typography;

export const UserManagementView: React.FC = () => {
    const screens = Grid.useBreakpoint();
    const {
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
    } = useUserManagement();

    const columns: TableProps<UserTableType>['columns'] = [
        { 
            title: 'Nombre', 
            dataIndex: 'name', 
            key: 'name', 
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (name: string, record) => (
                <Space>
                    <span>{name}</span>
                    {currentUser?.id === record.id && (
                        <Tag icon={<UserOutlined />} color="green">Tú</Tag>
                    )}
                </Space>
            )
        },
        { 
            title: 'Correo Electrónico', 
            dataIndex: 'email', 
            key: 'email', 
            responsive: ['sm'] 
        },
        {
            title: 'Rol', 
            dataIndex: 'role', 
            key: 'role', 
            responsive: ['md'],
            render: (role: string, record) => (
                <Tag color={record.roleId === 1 ? 'red' : 'blue'}>
                    {role}
                </Tag>
            ),
            filters: Object.values(ROLES).map(role => ({ text: role, value: role })),
            onFilter: (value, record) => record.role.indexOf(value as string) === 0,
        },
        {
            title: 'Acciones', 
            key: 'actions', 
            fixed: 'right', 
            width: 150,
            render: (_, record) => {
                const isCurrentUser = currentUser?.id === record.id;
                const canEdit = canEditAllUsers || isCurrentUser;
                const canDelete = canDeleteUsers && !isCurrentUser; // REMOVIDO: && record.roleId !== 1
                                                                    // Ahora permite eliminar admins si no es self

                return (
                    <Space size="small">
                        <Tooltip title={canEdit ? "Editar usuario" : "Sin permisos para editar"}>
                            <Button 
                                type="link" 
                                icon={<EditOutlined />}
                                onClick={() => showEditModal(record)}
                                disabled={!canEdit}
                            >
                                Editar
                            </Button>
                        </Tooltip>
                        
                        {canDelete && (
                            <Tooltip title="Eliminar usuario">
                                <Popconfirm
                                    title="¿Eliminar este usuario?"
                                    description="Esta acción no se puede deshacer"
                                    onConfirm={() => handleDelete(record.id)}
                                    okText="Sí" 
                                    cancelText="No"
                                    okType="danger"
                                >
                                    <Button 
                                        type="link" 
                                        danger 
                                        icon={<DeleteOutlined />}
                                    >
                                        Eliminar
                                    </Button>
                                </Popconfirm>
                            </Tooltip>
                        )}
                    </Space>
                );
            },
        },
    ];

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Flex justify="space-between" align="center">
                    <Title level={2} style={{ margin: 0 }}>Gestión de Usuarios</Title>
                    {currentUser && (
                        <Tag color={isAdmin(currentUser.role) ? 'red' : 'blue'}>
                            {ROLES[currentUser.role] || 'Usuario'}
                        </Tag>
                    )}
                </Flex>
                
                <Flex vertical={!screens.md} justify="flex-end" align="center" wrap="wrap" gap="middle">
                    {canCreateUsers && (
                        <Button 
                            type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={showAddModal} 
                            style={{ width: !screens.md ? '100%' : 'auto' }}
                        >
                            Agregar Usuario
                        </Button>
                    )}
                </Flex>

                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="key"
                    loading={loading}
                    scroll={{ x: 800 }}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => 
                            `${range[0]}-${range[1]} de ${total} usuarios`,
                    }}
                />
            </Space>

            <UserFormModal
                open={isModalVisible}
                onCancel={handleCancelModal}
                onFinish={handleFormFinish}
                editingUser={editingUser}
                isSubmitting={isSubmitting}
                currentUserRole={currentUser?.role}
                isAdminUser={canEditAllUsers}
            />
        </Card>
    );
};