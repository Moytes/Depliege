import React, { useState } from 'react';
import {
    Table,
    Button,
    Input,
    Modal,
    Form,
    Select,
    message,
    Space,
    Popconfirm,
    Typography,
    Card,
    Flex,
    Grid
} from 'antd';

import type { TableProps } from 'antd';
import { PlusOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

interface UserType {
    key: string;
    name: string;
    email: string;
    role: string;
}

const initialData: UserType[] = [
    { key: '1', name: 'Ana García', email: 'ana.garcia@example.com', role: 'Editor' },
    { key: '2', name: 'Carlos Martínez', email: 'carlos.martinez@example.com', role: 'Administrador' },
    { key: '3', name: 'Luisa Fernández', email: 'luisa.fernandez@example.com', role: 'Visitante' },
];

export const UserManagementView: React.FC = () => {
    const [data, setData] = useState<UserType[]>(initialData);
    const [filteredData, setFilteredData] = useState<UserType[]>(initialData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<UserType | null>(null);
    const [form] = Form.useForm();

    const screens = Grid.useBreakpoint();

    const handleSearch = (value: string) => {
        const filtered = data.filter(user =>
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const showAddModal = () => {
        setEditingUser(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const showEditModal = (user: UserType) => {
        setEditingUser(user);
        form.setFieldsValue(user);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingUser(null);
    };

    const handleDelete = (key: string) => {
        const newData = data.filter(user => user.key !== key);
        setData(newData);
        setFilteredData(newData);
        message.success('Usuario eliminado correctamente');
    };

    const onFinish = (values: any) => {
        if (editingUser) {
            const updatedData = data.map(user =>
                user.key === editingUser.key ? { ...user, ...values } : user
            );
            setData(updatedData);
            setFilteredData(updatedData);
            message.success('Usuario actualizado correctamente');
        } else {
            const newUser: UserType = { key: String(Date.now()), ...values };
            const updatedData = [...data, newUser];
            setData(updatedData);
            setFilteredData(updatedData);
            message.success('Usuario agregado correctamente');
        }
        setIsModalVisible(false);
    };
    const columns: TableProps<UserType>['columns'] = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'email',
            key: 'email',
            responsive: ['sm'],
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'Administrador', value: 'Administrador' },
                { text: 'Editor', value: 'Editor' },
                { text: 'Visitante', value: 'Visitante' },
            ],
            onFilter: (value, record) => record.role.indexOf(value as string) === 0,
            responsive: ['md'],
        },
        {
            title: 'Acciones',
            key: 'actions',
            fixed: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => showEditModal(record)}>Editar</Button>
                    <Popconfirm
                        title="¿Estás seguro de eliminar este usuario?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Sí"
                        cancelText="No"
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
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showAddModal}
                        style={{ width: !screens.md ? '100%' : 'auto' }}
                    >
                        Agregar Usuario
                    </Button>
                </Flex>
                <Table columns={columns} dataSource={filteredData} rowKey="key" scroll={{ x: true }}/>
            </Space>
            <Modal
                title={editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: 24 }}>
                    <Form.Item name="name" label="Nombre Completo" rules={[{ required: true, message: 'Por favor, ingresa el nombre.' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Ej: Juan Pérez" />
                    </Form.Item>
                    <Form.Item name="email" label="Correo Electrónico" rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido.' }]}>
                        <Input prefix={<MailOutlined />} placeholder="Ej: juan.perez@example.com" />
                    </Form.Item>
                    <Form.Item name="role" label="Rol" rules={[{ required: true, message: 'Por favor, selecciona un rol.' }]}>
                        <Select placeholder="Selecciona un rol">
                            <Option value="Administrador">Administrador</Option>
                            <Option value="Editor">Editor</Option>
                            <Option value="Visitante">Visitante</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                        <Button onClick={handleCancel} style={{ marginRight: 8 }}>Cancelar</Button>
                        <Button type="primary" htmlType="submit">{editingUser ? 'Guardar Cambios' : 'Crear Usuario'}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};