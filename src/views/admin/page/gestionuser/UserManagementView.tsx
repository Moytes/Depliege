import React, { useState } from 'react';
import { Table, Button, Space, Tag, Tooltip, Typography, Dropdown, MenuProps, Grid } from 'antd';
import { PlusOutlined, ReloadOutlined, EditOutlined, DeleteOutlined, MoreOutlined, MailOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { useUserManagement } from '../../../../hook/admin/gestionuser/useUserManagement';
import { UserFormModal } from './formulariomodal/UserFormModal';
import { UserTableData, Roles, Status } from '../../../../types/admin/user/userTypes';

const { Title } = Typography;
const { useBreakpoint } = Grid;

export const UserManagementView: React.FC = () => {
    const screens = useBreakpoint();

    const {
        users,
        loading,
        fetchUsers,
        handleCreateUser,
        handleEditUser,
        handleDeleteUser,
        handleResendCode
    } = useUserManagement();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserTableData | null>(null);

    const openCreateModal = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const openEditModal = (user: UserTableData) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const onModalSubmit = async (values: any) => {
        if (editingUser) {
            return await handleEditUser(editingUser.id, {
                userName: values.userName,
                mail: values.mail
            });
        } else {
            return await handleCreateUser(values);
        }
    };

    const columns: ColumnsType<UserTableData> = [
        {
            title: 'Usuario',
            dataIndex: 'nombre',
            key: 'nombre',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            render: (text) => <strong>{text}</strong>,
            fixed: screens.md ? 'left' : undefined,
            width: 150,
        },
        {
            title: 'Correo',
            dataIndex: 'correo',
            key: 'correo',
            width: 200,
        },
        {
            title: 'Rol',
            dataIndex: 'rol',
            key: 'rol',
            width: 100,
            render: (rol) => (
                <Tag color={rol === Roles.Administrador ? 'gold' : 'blue'}>
                    {rol === Roles.Administrador ? 'ADMIN' : 'USER'}
                </Tag>
            )
        },
        {
            title: 'Estado',
            dataIndex: 'estatus',
            key: 'estatus',
            width: 120,
            render: (status) => (
                <Tag icon={status === Status.Active ? <CheckCircleOutlined /> : <StopOutlined />} color={status === Status.Active ? 'success' : 'error'}>
                    {status === Status.Active ? 'Activo' : 'Inactivo'}
                </Tag>
            )
        },
        {
            title: 'Verificación',
            dataIndex: 'verificado',
            key: 'verificado',
            width: 120,
            render: (verificado) => (
                <Tag color={verificado === Status.Active ? 'cyan' : 'orange'}>
                    {verificado === Status.Active ? 'Verificado' : 'Pendiente'}
                </Tag>
            )
        },
        {
            title: 'Acciones',
            key: 'acciones',
            align: 'center',
            fixed: screens.md ? 'right' : undefined,
            width: 120,
            render: (_, record) => {
                const menuItems: MenuProps['items'] = [
                    {
                        key: 'resend',
                        label: 'Reenviar Código',
                        icon: <MailOutlined />,
                        onClick: () => handleResendCode(record.id)
                    }
                ];

                return (
                    <Space>
                        <Tooltip title="Editar datos básicos">
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => openEditModal(record)}
                                disabled={record.estatus === Status.Inactive}
                            />
                        </Tooltip>

                        <Tooltip title="Inactivar usuario">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteUser(record.id)}
                                disabled={record.estatus === Status.Inactive}
                            />
                        </Tooltip>

                        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                            <Button type="text" icon={<MoreOutlined />} />
                        </Dropdown>
                    </Space>
                );
            }
        }
    ];

    return (
        <div style={{ padding: screens.md ? 24 : 10 }}>

            <div style={{
                display: 'flex',
                flexDirection: screens.md ? 'row' : 'column',
                justifyContent: 'space-between',
                alignItems: screens.md ? 'center' : 'flex-start',
                marginBottom: 16,
                gap: 16
            }}>
                <Title level={screens.md ? 3 : 4} style={{ margin: 0 }}>
                    Gestión de Usuarios
                </Title>

                <Space wrap style={{ width: screens.md ? 'auto' : '100%', justifyContent: screens.md ? 'flex-end' : 'flex-start' }}>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={fetchUsers}
                        loading={loading}
                        style={{ flex: screens.xs ? 1 : 'none' }}
                    >
                        Recargar
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={openCreateModal}
                        style={{ flex: screens.xs ? 1 : 'none' }}
                    >
                        Nuevo Usuario
                    </Button>
                </Space>
            </div>

            <Table
                columns={columns}
                dataSource={users}
                loading={loading}
                pagination={{
                    pageSize: 10,
                    simple: !screens.md,
                    position: ['bottomCenter']
                }}
                scroll={{ x: 1000 }}
                size={screens.md ? 'large' : 'small'}
            />

            <UserFormModal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onSubmit={onModalSubmit}
                editingUser={editingUser}
                loading={loading}
            />
        </div>
    );
};