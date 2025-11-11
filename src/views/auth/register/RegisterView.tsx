// 📍 Archivo: src/views/auth/register/RegisterView.tsx

import React from 'react';
import { Form, Input, Button, Card, Typography, Flex, Grid, Checkbox, ConfigProvider } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
// --- 1. IMPORTA EL HOOK DESDE SU ARCHIVO CORRECTO ---
import { useRegisterForm } from '../../../hook/auth/register/RegisterUserData';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';

const { useBreakpoint } = Grid;
const { Title, Text, Link } = Typography;

interface RegisterViewProps {
    onBackToLogin: () => void;
}

// --- 2. EXPORTA EL COMPONENTE 'RegisterView' ---
export const RegisterView: React.FC<RegisterViewProps> = ({ onBackToLogin }) => {
    const screens = useBreakpoint();
    
    // --- 3. LLAMA AL HOOK SIN PARÁMETROS ---
    // El hook ya no necesita 'onBackToLogin' porque usa 'navigate'
    const { form, loading, onFinish } = useRegisterForm();

    const inputStyle: React.CSSProperties = {
        borderRadius: '8px',
        padding: '12px',
        background: theme.primaryDark,
        border: `1px solid ${hexToRgba(theme.textMuted, 0.3)}`,
        color: theme.text,
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: theme.secondary,
                    colorLink: theme.accent,
                    colorText: theme.textLight,
                    colorTextPlaceholder: theme.textLight
                }
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    background: theme.primaryDark,
                    padding: '16px',
                }}
            >
                <Card
                    style={{
                        width: screens.xs ? '100%' : 450,
                        maxWidth: '95vw',
                        borderRadius: '16px',
                        background: theme.primary,
                        padding: screens.xs ? '16px' : '24px',
                        border: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
                        boxShadow: `0 8px 25px ${hexToRgba(theme.primaryDark, 0.5)}`,
                    }}
                    styles={{
                        header: {
                            borderBottom: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
                            textAlign: 'center',
                            paddingBottom: '16px',
                            background: 'transparent',
                        },
                        body: {
                            padding: screens.xs ? '16px' : '24px',
                            background: 'transparent',
                        }
                    }}
                    title={
                        <Title
                            level={3}
                            style={{
                                margin: 0,
                                color: theme.text,
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
                        style={{ marginTop: '16px' }}
                    >
                        <Form.Item
                            name="name"
                            label={<Text strong style={{ color: theme.textLight }}>Nombre de Usuario</Text>}
                            rules={[
                                { required: true, message: 'Por favor, ingresa tu nombre de usuario' },
                                { min: 4, max: 25, message: 'El nombre debe tener entre 4 y 25 caracteres' },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined style={{ color: theme.textMuted }} />}
                                placeholder="Ej: Juan Pérez"
                                size="large"
                                style={inputStyle}
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<Text strong style={{ color: theme.textLight }}>Correo Electrónico</Text>}
                            rules={[
                                { required: true, message: 'Por favor, ingresa tu correo' },
                                { type: 'email', message: 'El formato del correo no es válido' },
                                { pattern: /^\S*$/, message: 'El correo no puede contener espacios' },
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined style={{ color: theme.textMuted }} />}
                                placeholder="tu-correo@ejemplo.com"
                                size="large"
                                style={inputStyle}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<Text strong style={{ color: theme.textLight }}>Contraseña</Text>}
                            rules={[
                                { required: true, message: 'Por favor, ingresa tu contraseña' },
                                { min: 12, message: 'La contraseña debe tener al menos 12 caracteres' },
                                { pattern: /(?=.*[A-Z])/, message: 'Debe contener al menos una mayúscula' },
                                { pattern: /(?=.*[!@#$%^&*])/, message: 'Debe contener al menos un carácter especial (!@#$%^&*)' },
                                { pattern: /^\S*$/, message: 'La contraseña no puede contener espacios' },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: theme.textMuted }} />}
                                placeholder="Crea una contraseña segura"
                                size="large"
                                style={inputStyle}
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label={<Text strong style={{ color: theme.textLight }}>Confirmar Contraseña</Text>}
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Por favor, confirma tu contraseña' },
                                { min: 12, message: 'La contraseña debe tener al menos 12 caracteres' },
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
                                prefix={<LockOutlined style={{ color: theme.textMuted }} />}
                                placeholder="Repite la contraseña"
                                size="large"
                                style={inputStyle}
                            />
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(new Error('Debes aceptar los términos y condiciones')),
                                },
                            ]}
                        >
                            <Checkbox>
                                He leído y acepto los
                                <Link href="/terminos" target="_blank" rel="noopener noreferrer">
                                    Términos y Condiciones
                                </Link>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item style={{ marginTop: '12px', marginBottom: '16px' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                                style={{
                                    borderRadius: '12px',
                                    height: '48px',
                                    fontWeight: 500,
                                    border: 'none',
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
                                    color: theme.textMuted,
                                    fontWeight: 500,
                                }}
                            >
                                Volver a Iniciar Sesión
                            </Button>
                        </Flex>
                    </Form>
                </Card>
            </div>
        </ConfigProvider>
    );
};