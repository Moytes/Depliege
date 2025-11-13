import React from 'react';
import { Form, Input, Button, Card, Typography, Flex, Grid, Checkbox, ConfigProvider } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, ArrowLeftOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useRegisterForm } from '../../../hook/auth/register/RegisterUserData';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';

const { useBreakpoint } = Grid;
const { Title, Text, Link } = Typography;

interface RegisterViewProps {
    onBackToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onBackToLogin }) => {
    const screens = useBreakpoint();
    const { form, loading, onFinish } = useRegisterForm();

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`,
        padding: screens.xs ? '16px' : '24px',
        position: 'relative',
        overflow: 'hidden',
    };

    const cardStyle: React.CSSProperties = {
        width: screens.xs ? '100%' : screens.sm ? '400px' : '450px',
        maxWidth: '95vw',
        borderRadius: '20px',
        background: `linear-gradient(145deg, ${theme.primary}, ${hexToRgba(theme.primaryDark, 0.9)})`,
        padding: screens.xs ? '20px' : '24px',
        border: `1px solid ${hexToRgba(theme.textLight, 0.15)}`,
        boxShadow: `0 20px 40px ${hexToRgba(theme.primaryDark, 0.4)}`,
        backdropFilter: 'blur(10px)',
    };

    const inputStyle: React.CSSProperties = {
        borderRadius: '12px',
        padding: screens.xs ? '12px' : '14px',
        background: hexToRgba(theme.primaryDark, 0.6),
        border: `1px solid ${hexToRgba(theme.textMuted, 0.2)}`,
        color: theme.text,
        fontSize: screens.xs ? '14px' : '16px',
        transition: 'all 0.3s ease',
    };

    const buttonStyle: React.CSSProperties = {
        borderRadius: '12px',
        height: screens.xs ? '44px' : '48px',
        fontWeight: 600,
        border: 'none',
        fontSize: screens.xs ? '14px' : '16px',
        background: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
        boxShadow: `0 4px 15px ${hexToRgba(theme.secondary, 0.3)}`,
        transition: 'all 0.3s ease',
    };

    const labelStyle: React.CSSProperties = {
        color: theme.textLight,
        fontWeight: 600,
        fontSize: screens.xs ? '14px' : '15px',
        marginBottom: '6px',
    };

    const backgroundElements = (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: screens.xs ? '150px' : '200px',
                    height: screens.xs ? '150px' : '200px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${hexToRgba(theme.secondary, 0.1)} 0%, transparent 70%)`,
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-10%',
                    width: screens.xs ? '120px' : '180px',
                    height: screens.xs ? '120px' : '180px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${hexToRgba(theme.accent, 0.1)} 0%, transparent 70%)`,
                    zIndex: 0,
                }}
            />
        </>
    );

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: theme.secondary,
                    colorLink: theme.accent,
                    colorText: theme.textLight,
                    colorTextPlaceholder: theme.textLight,
                    borderRadius: 12,
                },
                components: {
                    Input: {
                        colorBgContainer: hexToRgba(theme.primaryDark, 0.6),
                        colorBorder: hexToRgba(theme.textMuted, 0.2),
                        colorText: theme.text,
                        borderRadius: 12,
                    },
                    Checkbox: {
                        colorText: theme.textLight,
                    }
                }
            }}
        >
            <div style={containerStyle}>
                {backgroundElements}
                
                <Card
                    style={cardStyle}
                    styles={{
                        body: {
                            padding: screens.xs ? '16px 0' : '24px 0',
                            background: 'transparent',
                            position: 'relative',
                            zIndex: 1,
                        }
                    }}
                >
                    <Flex vertical align="center" style={{ marginBottom: screens.xs ? '20px' : '24px' }}>
                        <div
                            style={{
                                width: screens.xs ? '60px' : '70px',
                                height: screens.xs ? '60px' : '70px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '16px',
                                boxShadow: `0 8px 25px ${hexToRgba(theme.secondary, 0.3)}`,
                            }}
                        >
                            <UserOutlined style={{ fontSize: screens.xs ? '24px' : '28px', color: theme.primaryDark }} />
                        </div>
                        <Title 
                            level={screens.xs ? 3 : 2} 
                            style={{ 
                                margin: 0, 
                                color: theme.text,
                                textAlign: 'center',
                                background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 700,
                            }}
                        >
                            Crear una Cuenta
                        </Title>
                        <Text style={{ 
                            color: theme.textMuted, 
                            textAlign: 'center',
                            marginTop: '8px',
                            fontSize: screens.xs ? '14px' : '15px',
                        }}>
                            Completa tus datos para registrarte
                        </Text>
                    </Flex>

                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        layout="vertical"
                        autoComplete="off"
                        validateTrigger="onBlur"
                        style={{ width: '100%' }}
                    >
                        <Form.Item
                            name="name"
                            label={<Text style={labelStyle}>Nombre de Usuario</Text>}
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
                            label={<Text style={labelStyle}>Correo Electrónico</Text>}
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
                            label={<Text style={labelStyle}>Contraseña</Text>}
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
                            label={<Text style={labelStyle}>Confirmar Contraseña</Text>}
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
                            style={{ marginBottom: screens.xs ? '16px' : '20px' }}
                        >
                            <Checkbox 
                                style={{ 
                                    color: theme.textLight,
                                    fontSize: screens.xs ? '13px' : '14px',
                                    lineHeight: 1.4,
                                }}
                            >
                                He leído y acepto los{' '}
                                <Link 
                                    href="/terminos" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ color: theme.accent, fontWeight: 600 }}
                                >
                                    Términos y Condiciones
                                </Link>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '16px' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                                style={buttonStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = `0 6px 20px ${hexToRgba(theme.secondary, 0.4)}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = `0 4px 15px ${hexToRgba(theme.secondary, 0.3)}`;
                                }}
                            >
                                {loading ? 'Creando Cuenta...' : 'Registrar Cuenta'}
                            </Button>
                        </Form.Item>

                        <Flex justify="center" style={{ marginTop: screens.xs ? '12px' : '16px' }}>
                            <Button
                                type="link"
                                icon={<ArrowLeftOutlined />}
                                onClick={onBackToLogin}
                                style={{
                                    color: theme.textMuted,
                                    fontWeight: 600,
                                    fontSize: screens.xs ? '14px' : '15px',
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