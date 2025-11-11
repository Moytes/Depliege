import React from 'react';
import { Form, Button, Card, Typography, Flex, Grid, ConfigProvider, Input, message } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
// --- ESTA ES LA RUTA CORREGIDA ---
import { useVerifyAccountForm } from '../../../hook/auth/verify/useVerifyAccountForm';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export const VerifyAccountView: React.FC = () => {
    const screens = useBreakpoint();
// ... (sin cambios en el resto del archivo)
    const navigate = useNavigate();
    const { form, loading, onFinish, onResendCode } = useVerifyAccountForm();

    const inputStyle: React.CSSProperties = {
        borderRadius: '8px',
        padding: '12px',
        background: theme.primaryDark,
        border: `1px solid ${hexToRgba(theme.textMuted, 0.3)}`,
        color: theme.text,
    };

    const onBackToLogin = () => {
        navigate('/'); // Asumiendo que '/' es la vista de login/responsive
    };

    const handleResend = async () => {
        const result = await onResendCode();
        if (result.success) {
            message.success(result.message);
        } else {
            message.error(result.message);
        }
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
                    styles={{ body: { padding: '0' } }} // El padding se maneja adentro
                >
                    <Flex vertical align="center" style={{ padding: screens.xs ? '20px 16px' : '32px 24px' }}>
                        <CheckCircleOutlined style={{ fontSize: '48px', color: theme.secondary, marginBottom: '16px' }} />
                        <Title level={3} style={{ margin: 0, color: theme.text, textAlign: 'center' }}>
                            Verifica tu Cuenta
                        </Title>
                        <Text style={{ color: theme.textMuted, textAlign: 'center', marginTop: '8px', marginBottom: '24px' }}>
                            Hemos enviado un código de 8 dígitos a tu correo. Ingrésalo para activar tu cuenta.
                        </Text>

                        <Form
                            form={form}
                            name="verify"
                            onFinish={onFinish}
                            layout="vertical"
                            autoComplete="off"
                            style={{ width: '100%' }}
                        >
                            <Form.Item
                                name="verificationCode"
                                rules={[
                                    { required: true, message: 'Por favor, ingresa el código' },
                                    { len: 8, message: 'El código debe tener 8 caracteres' }
                                ]}
                            >
                                <Input.OTP 
                                    size="large" 
                                    length={8} 
                                    style={{ width: '100%', ...inputStyle }} 
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
                                        height: '48px',
                                        fontWeight: 500,
                                        border: 'none',
                                    }}
                                >
                                    Verificar y Activar
                                </Button>
                            </Form.Item>

                            <Flex justify="center" style={{ marginTop: '16px', gap: '16px' }} vertical={screens.xs}>
                                <Button
                                    type="link"
                                    onClick={handleResend}
                                    style={{ color: theme.accent, fontWeight: 500 }}
                                >
                                    Reenviar Código
                                </Button>
                                <Button
                                    type="link"
                                    icon={<ArrowLeftOutlined />}
                                    onClick={onBackToLogin}
                                    style={{ color: theme.textMuted, fontWeight: 500 }}
                                >
                                    Volver a Iniciar Sesión
                                </Button>
                            </Flex>
                        </Form>
                    </Flex>
                </Card>
            </div>
        </ConfigProvider>
    );
};