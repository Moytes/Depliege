import React from 'react';
import { Form, Input, Button, Typography, ConfigProvider, Row, Col, Grid, Flex, Card } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useLoginForm } from '../../../hook/auth/login/useLoginForm';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export const LoginView: React.FC = () => {
    const { form, loading, isBlocked, timeLeft, onFinish } = useLoginForm();
    const screens = useBreakpoint();

    const mainFlexStyle: React.CSSProperties = { 
        minHeight: '100vh', 
        width: '100%', 
        background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`,
        boxSizing: 'border-box',
        padding: screens.xs ? '16px' : '24px',
        position: 'relative',
        overflow: 'hidden',
    };

    const cardStyle: React.CSSProperties = { 
        width: '100%', 
        maxWidth: screens.lg ? '1200px' : '100%',
        boxShadow: `0 20px 40px ${hexToRgba(theme.primaryDark, 0.4)}`, 
        borderRadius: '20px', 
        overflow: 'hidden',
        border: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
        backdropFilter: 'blur(10px)',
    };

    const formColumnStyle: React.CSSProperties = { 
        height: '100%', 
        padding: screens.xs ? '32px 20px' : screens.md ? '48px 40px' : '60px 48px', 
        background: `linear-gradient(145deg, ${theme.primary}, ${hexToRgba(theme.primaryDark, 0.9)})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    const formWrapperStyle: React.CSSProperties = { 
        width: '100%', 
        maxWidth: screens.xs ? '100%' : '400px',
        margin: '0 auto',
    };

    const inputStyle: React.CSSProperties = {
        borderRadius: '12px',
        padding: screens.xs ? '14px' : '16px',
        background: hexToRgba(theme.primaryDark, 0.6),
        border: `1px solid ${hexToRgba(theme.textMuted, 0.2)}`,
        color: theme.text,
        fontSize: screens.xs ? '14px' : '16px',
        transition: 'all 0.3s ease',
    };

    const imageColumnStyle: React.CSSProperties = { 
        background: `linear-gradient(${hexToRgba(theme.primaryDark, 0.7)}, ${hexToRgba(theme.primaryDark, 0.7)}), url('/portada.jpeg')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center', 
        padding: screens.xs ? '40px 24px' : screens.md ? '60px 40px' : '80px 48px',
        color: theme.text,
        position: 'relative',
        minHeight: screens.xs ? '300px' : '400px',
    };

    const logoStyle: React.CSSProperties = { 
        height: screens.xs ? '60px' : screens.md ? '80px' : '100px', 
        width: 'auto', 
        marginBottom: screens.xs ? '16px' : '24px',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
    };

    const titleStyle: React.CSSProperties = { 
        color: theme.text,
        textShadow: '0 2px 8px rgba(0,0,0,0.6)', 
        maxWidth: '600px', 
        marginBottom: screens.xs ? '12px' : '16px', 
        fontSize: screens.xs ? '1.8rem' : screens.sm ? '2.2rem' : screens.lg ? '2.8rem' : '2.5rem',
        fontWeight: 700, 
        lineHeight: 1.2,
        background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const subtitleStyle: React.CSSProperties = { 
        color: theme.textLight,
        maxWidth: '500px', 
        fontSize: screens.xs ? '1rem' : screens.sm ? '1.1rem' : '1.2rem',
        lineHeight: 1.5,
        textShadow: '0 1px 3px rgba(0,0,0,0.4)',
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

    const backgroundElements = (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: screens.xs ? '200px' : '300px',
                    height: screens.xs ? '200px' : '300px',
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
                    width: screens.xs ? '150px' : '250px',
                    height: screens.xs ? '150px' : '250px',
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
                    colorTextPlaceholder: theme.textLight,
                    colorText: theme.textLight,
                    borderRadius: 12,
                },
                components: {
                    Input: {
                        colorBgContainer: hexToRgba(theme.primaryDark, 0.6),
                        colorBorder: hexToRgba(theme.textMuted, 0.2),
                        colorText: theme.text,
                        borderRadius: 12,
                    }
                }
            }}
        >
            <Flex justify="center" align="center" style={mainFlexStyle}>
                {backgroundElements}
                
                <Card style={cardStyle} bodyStyle={{ padding: 0 }}>
                    <Row gutter={0}>
                        <Col xs={24} md={12} style={imageColumnStyle}>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <Title level={1} style={titleStyle}>
                                    Gestión Inteligente de Invernaderos
                                </Title>
                                <Text style={subtitleStyle}>
                                    Monitoreo y control en tiempo real para optimizar tus cultivos y maximizar tu producción agrícola.
                                </Text>
                            </div>
                        </Col>
                        
                        <Col xs={24} md={12} style={formColumnStyle}>
                            <div style={formWrapperStyle}>
                                <Flex vertical align="center" style={{ marginBottom: screens.xs ? '24px' : '32px' }}>
                                    <img
                                        style={logoStyle}
                                        alt="Logo UTEQ"
                                        src="/logo.png"
                                    />
                                    <Title 
                                        level={screens.xs ? 3 : 2} 
                                        style={{ 
                                            color: theme.text, 
                                            margin: 0,
                                            textAlign: 'center',
                                        }}
                                    >
                                        Iniciar Sesión
                                    </Title>
                                    <Text style={{ color: theme.textMuted, marginTop: '8px', textAlign: 'center' }}>
                                        Accede a tu cuenta para gestionar tus invernaderos
                                    </Text>
                                </Flex>

                                <Form 
                                    form={form} 
                                    name="login" 
                                    onFinish={onFinish} 
                                    autoComplete="off" 
                                    layout="vertical"
                                    style={{ width: '100%' }}
                                >
                                    <Form.Item 
                                        name="email" 
                                        rules={[
                                            { required: true, message: 'Por favor, ingresa tu correo' }, 
                                            { type: 'email', message: 'El correo no es válido' }
                                        ]}
                                    >
                                        <Input 
                                            prefix={<UserOutlined style={{ color: theme.textMuted }} />} 
                                            placeholder="Correo Electrónico" 
                                            size="large" 
                                            disabled={isBlocked} 
                                            style={inputStyle}
                                        />
                                    </Form.Item>
                                    
                                    <Form.Item 
                                        name="password" 
                                        rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
                                    >
                                        <Input.Password 
                                            prefix={<LockOutlined style={{ color: theme.textMuted }} />} 
                                            placeholder="Contraseña" 
                                            size="large" 
                                            disabled={isBlocked} 
                                            style={inputStyle}
                                        />
                                    </Form.Item>

                                    {isBlocked && timeLeft && (
                                        <Flex 
                                            align="center" 
                                            justify="center" 
                                            gap="small"
                                            style={{ 
                                                marginBottom: '16px',
                                                padding: '12px',
                                                background: hexToRgba(theme.accent, 0.1),
                                                borderRadius: '8px',
                                                border: `1px solid ${hexToRgba(theme.accent, 0.2)}`
                                            }}
                                        >
                                            <SafetyCertificateOutlined style={{ color: theme.accent }} />
                                            <Text type="danger" style={{ textAlign: 'center', margin: 0 }}>
                                                Intente de nuevo en {timeLeft}
                                            </Text>
                                        </Flex>
                                    )}

                                    <Form.Item style={{ marginBottom: screens.xs ? '16px' : '20px' }}>
                                        <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            block 
                                            size="large" 
                                            loading={loading} 
                                            disabled={isBlocked || loading} 
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
                                            {loading ? 'Iniciando Sesión...' : 'Entrar'}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Flex>
        </ConfigProvider>
    );
};