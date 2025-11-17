import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Alert } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, CrownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { UserTableData } from '../../../../../types/admin/gestionuser/index';
import { Roles } from '../../../../../types/admin/user/userTypes'; // Importa Roles para consistencia

const { Option } = Select;

interface UserFormModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  editingUser: UserTableData | null;
  isSubmitting: boolean;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  onCancel,
  onFinish,
  editingUser,
  isSubmitting,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingUser) {
      form.setFieldsValue({
        nombre: editingUser.nombre,
        correo: editingUser.correo,
        rol: editingUser.rol, 
        password: '', 
      });
    } else {
      form.resetFields();
    }
  }, [editingUser, open, form]);

  const handleOk = () => {
    form.submit();
  };

  // Función auxiliar para mapear número de rol a string legible
  const getRolDisplay = (rol: number): string => {
    return rol === Roles.Administrador ? 'Administrador' : 'Usuario';
  };

  return (
    <Modal
      title="Editar Usuario"
      open={open}
      onCancel={onCancel}
      onOk={handleOk} 
      confirmLoading={isSubmitting} 
      destroyOnClose 
      width={600}
    >
      <Alert
        message="Funcionalidad Limitada por el Backend"
        description="Solo se guardarán los cambios en 'Nombre de Usuario' y 'Correo Electrónico'. El cambio de Rol y Contraseña no están soportados por el API actual."
        type="warning"
        showIcon
        icon={<InfoCircleOutlined />}
        style={{ marginBottom: 24 }}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish} 
        autoComplete="off"
      >
        <Form.Item
          name="nombre"
          label="Nombre de Usuario"
          rules={[
            { required: true, message: 'El nombre es obligatorio' },
            { min: 4, max: 25, message: 'Debe tener entre 4 y 25 caracteres' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Ej: jperez"
            disabled={isSubmitting}
          />
        </Form.Item>

        <Form.Item
          name="correo"
          label="Correo Electrónico"
          rules={[
            { required: true, message: 'El correo es obligatorio' },
            { type: 'email', message: 'El correo no es válido' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Ej: juan.perez@example.com"
            disabled={isSubmitting}
          />
        </Form.Item>

        <Form.Item name="rol" label="Rol (No editable)">
          <Select placeholder="Rol del usuario" disabled>
            {editingUser && (
              <Option value={editingUser.rol}>
                {getRolDisplay(editingUser.rol)}{' '}
                {editingUser.rol === Roles.Administrador && (
                  <CrownOutlined />
                )}
              </Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          name="password"
          label="Resetear Contraseña (No editable)"
          help="El backend no permite al admin resetear contraseñas."
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Funcionalidad no disponible"
            disabled
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};