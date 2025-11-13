import React, { useState, useEffect, useCallback } from 'react';
import { App, Table, Typography, Button, Space, Modal, Form, Input, Select, Tag, Tooltip, Dropdown, Menu, Alert } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, MoreOutlined, MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { GetUsersDto, Roles, Status, PatchUserRequest } from '../../../../types/admin/user/userTypes';

import { getUsers, createUser, deleteUser, patchUser, resendVerificationCode } from '../../../../services/admin/user/userAdminService';

const { Title } = Typography;
const { Option } = Select;

export const UserManagementView: React.FC = () => {
    const { message, modal } = App.useApp();

    const [users, setUsers] = useState<GetUsersDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<GetUsersDto | null>(null);

    const [form] = Form.useForm();

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error: any) {
            message.error(error.message || 'Error al cargar usuarios.');
        } finally {
            setLoading(false);
        }
    }, [message]); // 'message' es una dependencia externa

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // Ahora fetchUsers es una dependencia estable


    const handleOpenAddModal = () => {
        setEditingUser(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (user: GetUsersDto) => {
        setEditingUser(user);
        form.setFieldsValue({
            userName: user.userName,
            mail: user.mail,
        });
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        form.resetFields();
    };

    const handleFormSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (editingUser) {
                const request: PatchUserRequest = {
                    userName: values.userName,
                    mail: values.mail,
                };
                await patchUser(editingUser.id, request);
                message.success('Usuario actualizado correctamente.');
            } else {
                const request = {
                    userName: values.userName,
                    mail: values.mail,
                    role: values.role,
                    rawPassword: values.password,
                };
                await createUser(request);
                message.success('Usuario creado correctamente.');
            }
            handleCancel();
            fetchUsers();
        } catch (error: any) {
            message.error(error.message || 'Error al guardar el usuario.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        modal.confirm({
            title: '¿Estás seguro de eliminar este usuario?',
            content: 'Esta acción cambiará el estado del usuario a "Inactivo". No se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                try {
                    await deleteUser(id);
                    message.success('Usuario eliminado (inactivado) correctamente.');
                    fetchUsers();
                } catch (error: any) {
                    message.error(error.message || 'Error al eliminar el usuario.');
                }
            },
        });
    };

    const handleResendCode = async (userId: string) => {
        try {
            await resendVerificationCode({ userId });
            message.success('Correo de verificación reenviado.');
        } catch (error: any) {
            message.error(error.message || 'Error al reenviar el código.');
        }
    };

    const PasswordApiLimitationAlert = () => (
        <Alert
            type="warning"
            showIcon
            message="Limitación de API de Contraseña"
            description="El endpoint de 'Cambiar Contraseña' del backend requiere la 'contraseña actual' del usuario, 
            lo cual impide que el Administrador pueda 'resetear' contraseñas. 
            Esta funcionalidad solo está disponible para el usuario en su propio perfil."
            style={{ marginBottom: 16 }}
        />
    );


    const columns: ColumnsType<GetUsersDto> = [
        {
            title: 'Nombre de Usuario',
            dataIndex: 'userName',
            key: 'userName',
            sorter: (a, b) => a.userName.localeCompare(b.userName),
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'mail',
            key: 'mail',
            sorter: (a, b) => a.mail.localeCompare(b.mail),
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: (role: number) => (
                <Tag color={role === Roles.Administrador ? 'gold' : 'blue'}>
                    {role === Roles.Administrador ? 'Administrador' : 'Usuario'}
                </Tag>
            ),
            filters: [
                { text: 'Administrador', value: Roles.Administrador },
                { text: 'Usuario', value: Roles.User },
            ],
            onFilter: (value, record) => record.role === value,
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => (
                <Tag color={status === Status.Active ? 'success' : 'error'}>
                    {status === Status.Active ? 'Activo' : 'Inactivo'}
                </Tag>
            ),
            filters: [
                { text: 'Activo', value: Status.Active },
                { text: 'Inactivo', value: Status.Inactive },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Verificado',
            dataIndex: 'verified',
            key: 'verified',
            render: (verified: number) => (
                <Tag color={verified === Status.Active ? 'cyan' : 'orange'}>
                    {verified === Status.Active ? 'Verificado' : 'Pendiente'}
                </Tag>
            ),
            filters: [
                { text: 'Verificado', value: Status.Active },
                { text: 'Pendiente', value: Status.Inactive },
            ],
            onFilter: (value, record) => record.verified === value,
        },
        {
            title: 'Acciones',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => handleOpenEditModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Eliminar (Inactivar)">
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item
                                    key="resendCode"
                                    icon={<MailOutlined />}
                                    onClick={() => handleResendCode(record.id)}
                                >
                                    Reenviar Verificación
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button icon={<MoreOutlined />} />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Title level={2}>Gestión de Usuarios</Title>
                <Space>
                    <Tooltip title="Recargar lista">
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={fetchUsers}
                            loading={loading}
                        />
                    </Tooltip>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleOpenAddModal}
                    >
                        Crear Usuario
                    </Button>
                </Space>
            </Space>

            <PasswordApiLimitationAlert />

            <Table
                columns={columns}
                dataSource={users}
                loading={loading}
                rowKey="id"
                scroll={{ x: 'max-content' }}
            />

            <Modal
                title={editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    style={{ marginTop: 24 }}
                >
                    <Form.Item
                        name="userName"
                        label="Nombre de Usuario"
                        rules={[{ required: true, message: 'El nombre de usuario es obligatorio' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Ej. juan.perez"
                        />
                    </Form.Item>

                    <Form.Item
                        name="mail"
                        label="Correo Electrónico"
                        rules={[
                            { required: true, message: 'El correo es obligatorio' },
                            { type: 'email', message: 'Debe ser un correo válido' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Ej. usuario@dominio.com"
                        />
                    </Form.Item>

                    {!editingUser && (
                        <>
                            <Form.Item
                                name="password"
                                label="Contraseña"
                                rules={[{ required: true, message: 'La contraseña es obligatoria' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Contraseña segura"
                                />
                            </Form.Item>

                            <Form.Item
                                name="role"
                                label="Rol"
                                rules={[{ required: true, message: 'El rol es obligatorio' }]}
                                initialValue={Roles.User}
                            >
                                <Select>
                                    <Option value={Roles.Administrador}>Administrador</Option>
                                    <Option value={Roles.User}>Usuario</Option>
                                </Select>
                            </Form.Item>
                        </>
                    )}
                    <Form.Item style={{ textAlign: 'right', marginTop: 16 }}>
                        <Space>
                            <Button onClick={handleCancel}>
                                Cancelar
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </Space>
    );
};