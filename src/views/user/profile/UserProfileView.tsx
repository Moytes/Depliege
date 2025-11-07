import React, { useState, useEffect } from 'react';
import {Card,Form,Input,Button,Row,Col,Typography,message,Spin,Avatar,Flex,Divider} from 'antd';
import {UserOutlined,MailOutlined,LockOutlined,SaveOutlined,LoadingOutlined,EditOutlined} from '@ant-design/icons';
import axios from 'axios';
import { SHA256 } from 'crypto-js';

const { Title, Text } = Typography;

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

const API_BASE_URL = '/api/User';

interface UserDataDTO {
  userName: string;
  mail: string;
}

interface UpdateProfileRequest {
  userName: string;
  mail: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const UserProfileView: React.FC = () => {
  const [form] = Form.useForm();
  const { token, userId } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userData, setUserData] = useState<UserDataDTO | null>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

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
        setUserData(response.data);
        form.setFieldsValue({
          userName: response.data.userName,
          mail: response.data.mail,
        });
      } catch (error: any) {
        let msg = 'Error al cargar el perfil.';
        if (axios.isAxiosError(error) && error.response?.data?.errorMessage) {
          msg = error.response.data.errorMessage;
        }
        message.error(msg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token, form]);

  const onUpdateProfile = async (values: UpdateProfileRequest) => {
    setIsUpdating(true);

    const hasProfileDataChanged = values.userName !== userData?.userName || values.mail !== userData?.mail;
    const isPasswordChangeAttempt = !!(values.currentPassword && values.newPassword && values.confirmPassword);

    if (!hasProfileDataChanged && !isPasswordChangeAttempt) {
      message.info('No se detectaron cambios para actualizar.');
      setIsUpdating(false);
      return;
    }

    try {
      let profileSuccess = false;
      let passwordSuccess = false;

      if (hasProfileDataChanged) {
        const profilePayload = { 
          UserName: values.userName, 
          Mail: values.mail 
        };

        console.log("Enviando datos de perfil:", profilePayload);
        
        await axios.patch(`${API_BASE_URL}/PatchUser/${userId}`, profilePayload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        setUserData({
          userName: values.userName,
          mail: values.mail
        });
        profileSuccess = true;
      }

      if (isPasswordChangeAttempt) {
        const currentHashed = SHA256(values.currentPassword!).toString();
        const newHashed = SHA256(values.newPassword!).toString();
        const confirmHashed = SHA256(values.confirmPassword!).toString();

        const passwordPayload = {
          CurrentPassword: currentHashed,
          NewPassword: newHashed,
          ConfirmNewPassword: confirmHashed
        };

        console.log("Enviando datos de contraseña:", passwordPayload);
        console.log("URL:", `${API_BASE_URL}/ChangePassword/${userId}`);

        try {
          await axios.patch(`${API_BASE_URL}/ChangePassword/${userId}`, passwordPayload, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          form.setFieldsValue({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
          setShowPasswordFields(false); 
          passwordSuccess = true;
        } catch (passwordError: any) {
          if (axios.isAxiosError(passwordError)) {
            if (passwordError.response?.status === 400) {
              message.error('Error en el formato de la solicitud de contraseña. Verifica los datos.');
            } else if (passwordError.response?.data?.errorMessage) {
              message.error(passwordError.response.data.errorMessage);
            } else {
              message.error('Error al actualizar la contraseña.');
            }
          }
          throw passwordError; 
        }
      }

      if (profileSuccess && passwordSuccess) {
        message.success('Perfil y contraseña actualizados correctamente.');
      } else if (profileSuccess) {
        message.success('Perfil actualizado correctamente.');
      } else if (passwordSuccess) {
        message.success('Contraseña actualizada correctamente.');
      }

    } catch (error: any) {
      console.error("Error general en actualización:", error);
      let msg = 'Error al actualizar.';
      if (axios.isAxiosError(error) && error.response?.data?.errorMessage) {
        msg = error.response.data.errorMessage;
      } else if (axios.isAxiosError(error) && error.response?.status === 400) {
        msg = 'Error en el formato de la solicitud. Verifica los datos.';
      }
      message.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '60vh' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </Flex>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card 
        variant="borderless" 
        style={{ 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '12px'
        }}
      >
        <Flex justify="center" align="center" gap="large" style={{ marginBottom: '32px' }}>
          <Avatar 
            size={80} 
            icon={<UserOutlined />}
            style={{ 
              backgroundColor: '#1890ff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          />
          <Flex vertical>
            <Title level={3} style={{ margin: 0, color: '#262626' }}>
              {userData?.userName}
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              {userData?.mail}
            </Text>
          </Flex>
        </Flex>

        <Divider />

        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onUpdateProfile}
          requiredMark={false}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item 
                name="userName" 
                label="Nombre de Usuario" 
                rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}
              >
                <Input 
                  prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
                  placeholder="Nombre de Usuario"
                  size="large"
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item 
                name="mail" 
                label="Correo Electrónico" 
                rules={[{ required: true, type: 'email', message: 'Ingresa un email válido' }]}
              >
                <Input 
                  prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} 
                  placeholder="correo@ejemplo.com"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ marginBottom: '24px' }}>
            <Flex justify="space-between" align="center">
              <Text strong>Cambiar Contraseña</Text>
              <Button 
                type="link" 
                icon={<EditOutlined />}
                onClick={togglePasswordFields}
                style={{ padding: 0 }}
              >
                {showPasswordFields ? 'Ocultar' : 'Editar'}
              </Button>
            </Flex>
            
            {showPasswordFields && (
              <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
                <Row gutter={[16, 0]}>
                  <Col xs={24} md={8}>
                    <Form.Item 
                      name="currentPassword" 
                      label="Contraseña Actual"
                      rules={[
                        { required: showPasswordFields, message: 'Ingresa tu contraseña actual' },
                      ]}
                    >
                      <Input.Password 
                        prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} 
                        placeholder="Contraseña Actual"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item 
                      name="newPassword" 
                      label="Nueva Contraseña"
                      rules={[
                        { required: showPasswordFields, message: 'Ingresa tu nueva contraseña' },
                        { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
                      ]}
                    >
                      <Input.Password 
                        prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} 
                        placeholder="Nueva Contraseña"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={8}>
                    <Form.Item 
                      name="confirmPassword" 
                      label="Confirmar Contraseña"
                      dependencies={['newPassword']}
                      rules={[
                        { required: showPasswordFields, message: 'Confirma tu nueva contraseña' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Las contraseñas no coinciden.'));
                          },
                        })
                      ]}
                    >
                      <Input.Password 
                        prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} 
                        placeholder="Confirmar Contraseña"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isUpdating} 
              icon={<SaveOutlined />} 
              size="large"
              block
              style={{
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '8px'
              }}
            >
              Actualizar Perfil
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};