// src/views/admin/page/gestionuser/components/UserFormModal.tsx

import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { UserTableType, ROLES } from '../../../../../types/admin/gestionuser/index';

const { Option } = Select;

interface UserFormModalProps {
    open: boolean;
    onCancel: () => void;
    onFinish: (values: any) => void;
    editingUser: UserTableType | null;
    isSubmitting: boolean;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({ open, onCancel, onFinish, editingUser, isSubmitting }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (editingUser) {
            form.setFieldsValue({
                name: editingUser.name,
                email: editingUser.email,
                role: editingUser.roleId,
            });
        } else {
            form.resetFields();
        }
    }, [editingUser, open, form]);

    return (
        <Modal
            title={editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
            open={open}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: 24 }} autoComplete="off">
                <Form.Item name="name" label="Nombre de Usuario" rules={[{ required: true, message: 'Por favor, ingresa el nombre de usuario.' }]}>
                    <Input prefix={<UserOutlined />} placeholder="Ej: jperez" />
                </Form.Item>
                <Form.Item name="email" label="Correo Electrónico" rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido.' }]}>
                    <Input prefix={<MailOutlined />} placeholder="Ej: juan.perez@example.com" />
                </Form.Item>

                {!editingUser && (
                    <>
                        <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'La contraseña es obligatoria.' }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña segura" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirmar Contraseña"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Confirma tu contraseña.' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) return Promise.resolve();
                                        return Promise.reject(new Error('Las contraseñas no coinciden.'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Repite la contraseña" />
                        </Form.Item>
                    </>
                )}

                <Form.Item name="role" label="Rol" rules={[{ required: true, message: 'Por favor, selecciona un rol.' }]}>
                    <Select placeholder="Selecciona un rol">
                        {Object.entries(ROLES).map(([id, name]) => (
                            <Option key={id} value={parseInt(id, 10)}>{name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                    <Button onClick={onCancel} style={{ marginRight: 8 }} disabled={isSubmitting}>Cancelar</Button>
                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};