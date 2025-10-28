import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  message,
  Spin,
  Avatar,
  Flex
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SaveOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

// --- LÓGICA DE AUTENTICACIÓN (BASADA EN TUS ARCHIVOS) ---

export interface DecodedToken {
  email?: string;
  nameid?: string;
  sub?: string;
  exp?: number;
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const payloadBase64 = token.split('.')[1];
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(base64);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

const useAuth = () => {
  const token = localStorage.getItem('authToken');
  let userId = null;

  if (token) {
    const decoded = decodeToken(token);
    if (decoded && decoded.nameid) {
      userId = decoded.nameid;
    } else if (decoded && decoded.sub) {
      userId = decoded.sub;
    } else {
      console.error("No se pudo encontrar 'nameid' o 'sub' en el token decodificado.");
    }
  }

  return { token, userId };
};

// --- FIN DE LÓGICA DE AUTENTICACIÓN ---

const API_BASE_URL = '/api/User';

interface UserDataDTO {
  userName: string;
  mail: string;
}

interface PatchUserRequest {
  userName: string;
  mail: string;
}

interface ChangePasswordRequest {
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export const UserProfileView: React.FC = () => {
  const [infoForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { token, userId } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    if (!userId || !token) {
      message.error('No se pudo verificar la autenticación. Por favor, inicia sesión de nuevo.');
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<UserDataDTO>(`${API_BASE_URL}/GetUserById/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        infoForm.setFieldsValue({
          userName: response.data.userName,
          mail: response.data.mail,
        });
      }  catch (error: any) { let msg = 'Error al cargar el perfil.';
        if (axios.isAxiosError(error) && error.response?.data?.errorMessage) { msg = error.response.data.errorMessage;
        }message.error(msg); 
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token, infoForm]);

  const onUpdateInfo = async (values: PatchUserRequest) => {
    setIsUpdatingInfo(true);
    try {
      await axios.patch(`${API_BASE_URL}/PatchUser/${userId}`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      message.success('Perfil actualizado correctamente.');
    } catch (error: any) {
      let msg = 'Error al actualizar el perfil.';
      if (axios.isAxiosError(error) && error.response?.data?.errorMessage) {
          msg = error.response.data.errorMessage;
      }
      message.error(msg);
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  const onChangePassword = async (values: ChangePasswordRequest) => {
    setIsUpdatingPassword(true);
    try {
      const payload = {
        NewPassword: values.newPassword,
        ConfirmNewPassword: values.confirmNewPassword,
        OldPassword: values.oldPassword
      };
      await axios.patch(`${API_BASE_URL}/ChangePassword/${userId}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      message.success('Contraseña actualizada correctamente.');
      passwordForm.resetFields();
    } catch (error: any) {
      let msg = 'Error al cambiar la contraseña.';
      if (axios.isAxiosError(error) && error.response?.data?.errorMessage) {
          msg = error.response.data.errorMessage;
      }
      message.error(msg);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '60vh' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} tip="Cargando perfil..." />
      </Flex>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>Gestión de Perfil</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Información del Perfil" bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Flex justify="center" style={{ marginBottom: '24px' }}>
              <Avatar size={100} icon={<UserOutlined />} />
            </Flex>
            <Form form={infoForm} layout="vertical" onFinish={onUpdateInfo}>
              <Form.Item name="userName" label="Nombre de Usuario" rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}>
                <Input prefix={<UserOutlined />} placeholder="Nombre de Usuario" />
              </Form.Item>
              <Form.Item name="mail" label="Correo Electrónico" rules={[{ required: true, type: 'email', message: 'Ingresa un email válido' }]}>
                <Input prefix={<MailOutlined />} placeholder="correo@ejemplo.com" />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" loading={isUpdatingInfo} icon={<SaveOutlined />} block>
                  Guardar Cambios
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Cambiar Contraseña" bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Form form={passwordForm} layout="vertical" onFinish={onChangePassword}>
              <Form.Item name="oldPassword" label="Contraseña Actual" rules={[{ required: true, message: 'Ingresa tu contraseña actual' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Contraseña Actual" />
              </Form.Item>
              <Form.Item name="newPassword" label="Nueva Contraseña" rules={[{ required: true, message: 'Ingresa tu nueva contraseña' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Nueva Contraseña" />
              </Form.Item>
              <Form.Item name="confirmNewPassword" label="Confirmar Nueva Contraseña" dependencies={['newPassword']} rules={[{ required: true, message: 'Confirma tu nueva contraseña' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('newPassword') === value) { return Promise.resolve(); } return Promise.reject(new Error('Las nuevas contraseñas no coinciden.')); }, })]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Confirmar Nueva Contraseña" />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" loading={isUpdatingPassword} icon={<SaveOutlined />} block danger>
                  Actualizar Contraseña
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};