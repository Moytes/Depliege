import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Alert, Divider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { UserTableData, Roles } from '../../../../../types/admin/user/userTypes';

const { Option } = Select;

interface UserFormModalProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => Promise<boolean>; 
    editingUser: UserTableData | null;
    loading: boolean;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
    open,
    onCancel,
    onSubmit,
    editingUser,
    loading,
}) => {
    const [form] = Form.useForm();
    const isEditMode = !!editingUser;

    useEffect(() => {
        if (open) {
            form.resetFields();
            if (editingUser) {
                form.setFieldsValue({
                    userName: editingUser.nombre,
                    mail: editingUser.correo,
                    role: editingUser.rol
                });
            }
        }
    }, [open, editingUser, form]);

    const handleFinish = async (values: any) => {
        const success = await onSubmit(values);
        if (success) {
            onCancel();
        }
    };

    return (
        <Modal
            title={isEditMode ? "Editar Información de Usuario" : "Registrar Nuevo Usuario"}
            open={open}
            onCancel={onCancel}
            onOk={form.submit}
            confirmLoading={loading}
            destroyOnClose
        >
            {isEditMode && (
                <Alert 
                    message="Modo Edición Restringido" 
                    description="Solo puede modificar el Nombre y el Correo. Para cambiar contraseña, el usuario debe hacerlo desde su perfil. Para cambiar rol, inactive y cree uno nuevo." 
                    type="info" 
                    showIcon 
                    style={{ marginBottom: 20 }} 
                />
            )}

            <Form form={form} layout="vertical" onFinish={handleFinish}>
                
                <Form.Item
                    name="userName"
                    label="Nombre de Usuario"
                    rules={[{ required: true, message: 'Ingrese el nombre de usuario' }, { min: 4, max: 25, message: 'Entre 4 y 25 caracteres' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Ej. JuanPerez" />
                </Form.Item>

                <Form.Item
                    name="mail"
                    label="Correo Electrónico"
                    rules={[{ required: true, message: 'Ingrese el correo' }, { type: 'email', message: 'Correo inválido' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="usuario@ejemplo.com" />
                </Form.Item>

                {!isEditMode && (
                    <>
                        <Divider dashed />
                        <Form.Item
                            name="password"
                            label="Contraseña Inicial"
                            rules={[
                                { required: true, message: 'La contraseña es obligatoria al crear' },
                                { min: 8, message: 'Mínimo 8 caracteres' }
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Ingrese contraseña segura" />
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="Asignar Rol"
                            initialValue={Roles.User}
                            rules={[{ required: true }]}
                        >
                            <Select>
                                <Option value={Roles.Administrador}><SafetyCertificateOutlined /> Administrador</Option>
                                <Option value={Roles.User}><UserOutlined /> Usuario Estándar</Option>
                            </Select>
                        </Form.Item>
                    </>
                )}

                {isEditMode && (
                    <Form.Item label="Rol Actual">
                        <Select disabled value={editingUser.rol}>
                             <Option value={Roles.Administrador}>Administrador</Option>
                             <Option value={Roles.User}>Usuario</Option>
                        </Select>
                    </Form.Item>
                )}

            </Form>
        </Modal>
    );
};