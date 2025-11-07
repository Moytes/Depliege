import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Alert } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, InfoCircleOutlined, CrownOutlined } from '@ant-design/icons';
import { UserTableType, ROLES } from '../../../../../types/admin/gestionuser/index';

const { Option } = Select;

interface UserFormModalProps {
    open: boolean;
    onCancel: () => void;
    onFinish: (values: any) => void;
    editingUser: UserTableType | null;
    isSubmitting: boolean;
    currentUserRole?: number;
    isAdminUser?: boolean; // Cambiado de 'boolean | null' a 'boolean | undefined'
}

export const UserFormModal: React.FC<UserFormModalProps> = ({ 
    open, 
    onCancel, 
    onFinish, 
    editingUser, 
    isSubmitting,
    currentUserRole,
    isAdminUser = false
}) => {
    const [form] = Form.useForm();
    const isEditing = !!editingUser;
    const canManageRoles = isAdminUser; // Admin puede gestionar roles y contraseñas

    useEffect(() => {
        if (editingUser) {
            form.setFieldsValue({
                name: editingUser.name,
                email: editingUser.email,
                role: editingUser.roleId,
                // No pre-llenar contraseñas
                currentPassword: '',
                password: '',
                confirmPassword: '',
            });
        } else {
            form.resetFields();
        }
    }, [editingUser, open, form]);

    const handleOk = () => {
        form.submit();
    };

    return (
        <Modal
            title={
                <span>
                    {isEditing ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                    {isAdminUser && <CrownOutlined style={{ marginLeft: 8, color: '#ff4d4f' }} />}
                </span>
            }
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
            confirmLoading={isSubmitting}
            destroyOnHidden
            width={600}
        >
            {!canManageRoles && isEditing && (
                <Alert
                    message="Modo de edición limitado"
                    description="Solo puedes editar tu nombre y correo electrónico. Para cambiar contraseña, ingresa la actual."
                    type="info"
                    showIcon
                    icon={<InfoCircleOutlined />}
                    style={{ marginBottom: 16 }}
                />
            )}

            {canManageRoles && isEditing && (
                <Alert
                    message="Modo administrador"
                    description="Puedes editar toda la información del usuario, incluyendo su rol y contraseña (la contraseña actual es opcional)."
                    type="success"
                    showIcon
                    icon={<CrownOutlined />}
                    style={{ marginBottom: 16 }}
                />
            )}

            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish} 
                style={{ marginTop: 16 }}
                autoComplete="off"
            >
                <Form.Item 
                    name="name" 
                    label="Nombre de Usuario" 
                    rules={[
                        { required: true, message: 'El nombre es obligatorio' },
                        { min: 4, max: 25, message: 'El nombre debe tener entre 4 y 25 caracteres' }
                    ]}
                >
                    <Input 
                        prefix={<UserOutlined />} 
                        placeholder="Ej: jperez" 
                        disabled={isSubmitting}
                    />
                </Form.Item>

                <Form.Item 
                    name="email" 
                    label="Correo Electrónico" 
                    rules={[
                        { required: true, message: 'El correo es obligatorio' },
                        { type: 'email', message: 'El correo no es válido' }
                    ]}
                >
                    <Input 
                        prefix={<MailOutlined />} 
                        placeholder="Ej: juan.perez@example.com" 
                        disabled={isSubmitting}
                    />
                </Form.Item>

                {/* --- CAMPOS DE CONTRASEÑA --- */}

                {/* 1. CAMPOS PARA CREAR USUARIO (requerido) */}
                {!isEditing && (
                    <>
                        <Form.Item 
                            name="password" 
                            label="Contraseña" 
                            rules={[
                                { required: true, message: 'La contraseña es obligatoria' },
                                { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Contraseña segura" 
                                disabled={isSubmitting}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirmar Contraseña"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'La confirmación es obligatoria' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Las contraseñas no coinciden'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Repite la contraseña" 
                                disabled={isSubmitting}
                            />
                        </Form.Item>
                    </>
                )}

                {/* 2. CAMPOS PARA EDITAR USUARIO (opcional para admin, requerido current para user) */}
                {isEditing && (
                    <>
                        <Form.Item 
                            name="currentPassword" 
                            label={canManageRoles ? 'Contraseña Actual (Opcional)' : 'Contraseña Actual'}
                            rules={canManageRoles ? [] : [
                                { required: true, message: 'La contraseña actual es obligatoria para cambiarla' },
                                { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder={canManageRoles ? 'Ingresa si deseas verificar' : 'Ingresa tu contraseña actual'}
                                disabled={isSubmitting}
                            />
                        </Form.Item>

                        <p style={{ marginBottom: 16, color: 'rgba(0, 0, 0, 0.45)' }}>
                            {canManageRoles ? 'Dejar en blanco para no cambiar la contraseña.' : 'Ingresa nueva contraseña para cambiarla.'}
                        </p>

                        <Form.Item 
                            name="password" 
                            label="Nueva Contraseña (Opcional)" 
                            rules={[
                                { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Nueva contraseña segura" 
                                disabled={isSubmitting}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirmar Nueva Contraseña"
                            dependencies={['password']}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Las nuevas contraseñas no coinciden'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Repite la nueva contraseña" 
                                disabled={isSubmitting}
                            />
                        </Form.Item>
                    </>
                )}
                
                {/* --- FIN CAMPOS DE CONTRASEÑA --- */}


                <Form.Item 
                    name="role" 
                    label="Rol" 
                    rules={[{ required: true, message: 'El rol es obligatorio' }]}
                >
                    <Select 
                        placeholder="Selecciona un rol" 
                        disabled={!canManageRoles || isSubmitting}
                    >
                        {Object.entries(ROLES).map(([id, name]) => (
                            <Option key={id} value={parseInt(id, 10)}>
                                {name} {parseInt(id, 10) === 1 && <CrownOutlined style={{ color: '#ff4d4f' }} />}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};