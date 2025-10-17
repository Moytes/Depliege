import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Flex, Grid, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { SHA256 } from 'crypto-js';
import { registerUser } from '../../../services/auth/registro/authService';
import { RegisterUserData } from '../../../types/auth/registro/auth';
import axios from 'axios';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

interface RegisterViewProps {
    onBackToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onBackToLogin }) => {
    const [form] = Form.useForm();
    const screens = useBreakpoint();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const trimmedName = values.name.trim();
            const trimmedEmail = values.email.trim();
            const hashedPassword = SHA256(values.password).toString();

            const userData: RegisterUserData = {
                UserName: trimmedName,
                Mail: trimmedEmail,
                Password: hashedPassword,
            };

            const response = await registerUser(userData);
            message.success(response.message || '¡Usuario registrado con éxito!');
            form.resetFields();
            onBackToLogin();
        } catch (error: any) {
            console.error('Objeto de error completo:', error);
            let errorMessage = 'No se pudo completar el registro.';
            if (axios.isAxiosError(error) && error.response) {
                const validationErrors = error.response.data.errors;
                if (validationErrors) {
                    const errorKey = Object.keys(validationErrors)[0];
                    errorMessage = validationErrors[errorKey][0];
                }
            }
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                padding: '16px',
            }}
        >
            <Card
                style={{
                    width: screens.xs ? '100%' : 450,
                    maxWidth: '95vw',
                    borderRadius: '20px',
                    background: '#f8f9fa', 
                    padding: screens.xs ? '16px' : '24px',
                    transition: 'all 0.3s ease',
                    border: '1px solid #dee2e6', 
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)', 
                }}
                headStyle={{
                    borderBottom: '1px solid #dee2e6', 
                    textAlign: 'center',
                    paddingBottom: '16px',
                    background: 'transparent',
                }}
                bodyStyle={{
                    padding: screens.xs ? '16px' : '24px',
                    background: 'transparent',
                }}
                title={
                    <Title
                        level={3}
                        style={{
                            margin: 0,
                            color: '#495057', 
                            fontWeight: 600,
                        }}
                    >
                        Crear una Cuenta
                    </Title>
                }
            >
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                    validateTrigger="onBlur"
                    style={{
                        marginTop: '16px',
                    }}
                >
                    <Form.Item
                        name="name"
                        label={<Text strong style={{ color: '#495057' }}>Nombre de Usuario</Text>}
                        rules={[
                            { required: true, message: 'Por favor, ingresa tu nombre de usuario' },
                            { min: 4, max: 25, message: 'El nombre debe tener entre 4 y 25 caracteres' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: '#6c757d' }} />}
                            placeholder="Ej: Juan Pérez"
                            size="large"
                            style={{
                                borderRadius: '12px',
                                padding: '12px',
                                border: '1px solid #ced4da',
                                background: '#ffffff',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#1677ff';
                                e.target.style.boxShadow = '0 0 0 2px rgba(22, 119, 255, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#ced4da';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={<Text strong style={{ color: '#495057' }}>Correo Electrónico</Text>}
                        rules={[
                            { required: true, message: 'Por favor, ingresa tu correo' },
                            { type: 'email', message: 'El formato del correo no es válido' },
                            { pattern: /^\S*$/, message: 'El correo no puede contener espacios' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined style={{ color: '#6c757d' }} />}
                            placeholder="tu-correo@ejemplo.com"
                            size="large"
                            style={{
                                borderRadius: '12px',
                                padding: '12px',
                                border: '1px solid #ced4da',
                                background: '#ffffff',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#1677ff';
                                e.target.style.boxShadow = '0 0 0 2px rgba(22, 119, 255, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#ced4da';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<Text strong style={{ color: '#495057' }}>Contraseña</Text>}
                        rules={[
                            { required: true, message: 'Por favor, ingresa tu contraseña' },
                            { pattern: /^\S*$/, message: 'La contraseña no puede contener espacios' },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: '#6c757d' }} />}
                            placeholder="Crea una contraseña segura"
                            size="large"
                            style={{
                                borderRadius: '12px',
                                padding: '12px',
                                border: '1px solid #ced4da',
                                background: '#ffffff',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#1677ff';
                                e.target.style.boxShadow = '0 0 0 2px rgba(22, 119, 255, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#ced4da';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label={<Text strong style={{ color: '#495057' }}>Confirmar Contraseña</Text>}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Por favor, confirma tu contraseña' },
                            { pattern: /^\S*$/, message: 'La contraseña no puede contener espacios' },
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
                            prefix={<LockOutlined style={{ color: '#6c757d' }} />}
                            placeholder="Repite la contraseña"
                            size="large"
                            style={{
                                borderRadius: '12px',
                                padding: '12px',
                                border: '1px solid #ced4da',
                                background: '#ffffff',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#1677ff';
                                e.target.style.boxShadow = '0 0 0 2px rgba(22, 119, 255, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#ced4da';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginTop: '24px', marginBottom: '16px' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                            style={{
                                borderRadius: '12px',
                                padding: '10px',
                                height: '48px',
                                fontWeight: 500,
                                background: '#1677ff',
                                border: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(22, 119, 255, 0.3)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#0958d9';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 18px rgba(22, 119, 255, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#1677ff';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 119, 255, 0.3)';
                            }}
                        >
                            Registrar Cuenta
                        </Button>
                    </Form.Item>

                    <Flex justify="center" style={{ marginTop: '16px' }}>
                        <Button
                            type="link"
                            icon={<ArrowLeftOutlined />}
                            onClick={onBackToLogin}
                            style={{
                                color: '#6c757d',
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                borderRadius: '6px',
                                padding: '8px 16px',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#495057';
                                e.currentTarget.style.background = '#e9ecef';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#6c757d';
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            Volver a Iniciar Sesión
                        </Button>
                    </Flex>
                </Form>
            </Card>
        </div>
    );
};