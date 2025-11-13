import React from 'react';
import { Form, Button, Card, Typography, Flex, Grid, ConfigProvider, Input, App } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useVerifyAccountForm } from '../../../hook/auth/verify/useVerifyAccountForm';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export const VerifyAccountView: React.FC = () => {
    const screens = useBreakpoint();
    const { message } = App.useApp(); 
    const navigate = useNavigate();
    
    const { form, loading, resendLoading, onFinish, onResendCode } = useVerifyAccountForm();

    const cardStyle: React.CSSProperties = {
        width: screens.xs ? '95vw' : screens.sm ? '400px' : '450px',
        maxWidth: '95vw',
        borderRadius: '20px',
        background: `linear-gradient(145deg, ${theme.primary}, ${hexToRgba(theme.primaryDark, 0.9)})`,
        padding: screens.xs ? '20px' : '32px',
        border: `1px solid ${hexToRgba(theme.textLight, 0.15)}`,
        boxShadow: `0 20px 40px ${hexToRgba(theme.primaryDark, 0.4)}`,
        backdropFilter: 'blur(10px)',
    };

    const otpInputStyle: React.CSSProperties = {
        borderRadius: '12px',
        padding: '14px',
        background: hexToRgba(theme.primaryDark, 0.6),
        border: `1px solid ${hexToRgba(theme.textMuted, 0.2)}`,
        color: theme.text,
        fontSize: '16px',
        transition: 'all 0.3s ease',
        width: '100%',
        height: '50px',
    };

    const buttonStyle: React.CSSProperties = {
        borderRadius: '12px',
        height: '50px',
        fontWeight: 600,
        border: 'none',
        fontSize: '16px',
        background: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
        boxShadow: `0 4px 15px ${hexToRgba(theme.secondary, 0.3)}`,
        transition: 'all 0.3s ease',
    };

    const onBackToLogin = () => {
        localStorage.removeItem('authToken');
        navigate('/'); 
    };

    const handleResend = () => {
        onResendCode();
    };

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
                        paddingBlock: 14,
                        paddingInline: 14,
                    }
                }
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`,
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-10%',
                        width: '300px',
                        height: '300px',
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
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${hexToRgba(theme.accent, 0.1)} 0%, transparent 70%)`,
                        zIndex: 0,
                    }}
                />

                <Card
                    style={cardStyle}
                    styles={{ 
                        body: { 
                            padding: '0',
                            position: 'relative',
                            zIndex: 1,
                        } 
                    }}
                >
                    <Flex 
                        vertical 
                        align="center" 
                        style={{ 
                            padding: screens.xs ? '24px 16px' : '32px 0',
                            gap: '24px'
                        }}
                    >
                        <div
                            style={{
                                width: screens.xs ? '70px' : '80px',
                                height: screens.xs ? '70px' : '80px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: `0 8px 25px ${hexToRgba(theme.secondary, 0.3)}`,
                            }}
                        >
                            <CheckCircleOutlined 
                                style={{ 
                                    fontSize: screens.xs ? '32px' : '36px', 
                                    color: theme.primaryDark 
                                }} 
                            />
                        </div>

                        <Flex vertical align="center" style={{ gap: '12px', textAlign: 'center' }}>
                            <Title 
                                level={screens.xs ? 3 : 2} 
                                style={{ 
                                    margin: 0, 
                                    color: theme.text,
                                    background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 700,
                                }}
                            >
                                Verifica tu Cuenta
                            </Title>
                            <Text 
                                style={{ 
                                    color: theme.textMuted, 
                                    fontSize: screens.xs ? '14px' : '16px',
                                    lineHeight: 1.5,
                                    maxWidth: '320px',
                                }}
                            >
                                Hemos enviado un código de 8 dígitos a tu correo electrónico. 
                                Ingresa el código para activar tu cuenta.
                            </Text>
                        </Flex>

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
                                style={{ marginBottom: '8px' }}
                            >
                                <Input.OTP 
                                    size="large" 
                                    length={8} 
                                    style={otpInputStyle}
                                />
                            </Form.Item>

                            <Form.Item style={{ margin: '24px 0 16px 0' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    size="large"
                                    loading={loading}
                                    disabled={loading || resendLoading}
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
                                    Verificar y Activar
                                </Button>
                            </Form.Item>

                            <Flex 
                                justify="center" 
                                style={{ 
                                    marginTop: '24px', 
                                    gap: screens.xs ? '12px' : '20px',
                                    flexDirection: screens.xs ? 'column' : 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    type="link"
                                    onClick={handleResend}
                                    loading={resendLoading}
                                    disabled={loading || resendLoading}
                                    icon={<MailOutlined />}
                                    style={{ 
                                        color: theme.accent, 
                                        fontWeight: 600,
                                        fontSize: screens.xs ? '14px' : '15px',
                                    }}
                                >
                                    Reenviar Código
                                </Button>
                                <Button
                                    type="link"
                                    icon={<ArrowLeftOutlined />}
                                    onClick={onBackToLogin}
                                    disabled={loading || resendLoading}
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
                    </Flex>
                </Card>
            </div>
        </ConfigProvider>
    );
};