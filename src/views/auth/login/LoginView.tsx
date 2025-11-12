import React from 'react';
import { Form, Input, Button, Typography, ConfigProvider, Row, Col, Grid, Flex, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useLoginForm } from '../../../hook/auth/login/useLoginForm';

const { useBreakpoint } = Grid;
const mainFlexStyle: React.CSSProperties = { minHeight: '100vh', width: '100%', background: theme.primaryDark, boxSizing: 'border-box' };
const cardStyle: React.CSSProperties = { 
    width: '100%', 
    maxWidth: '1100px', 
    boxShadow: `0 8px 24px ${hexToRgba(theme.primaryDark, 0.5)}`, 
    borderRadius: '16px', 
    overflow: 'hidden' 
};
const formColumnStyle: React.CSSProperties = { 
    height: '100%', 
    padding: '40px 32px', 
    background: theme.primary 
};
const formWrapperStyle: React.CSSProperties = { width: '100%', maxWidth: '400px' };
const inputStyle: React.CSSProperties = {
    borderRadius: '8px',
    padding: '12px',
    background: theme.primaryDark,
    border: `1px solid ${hexToRgba(theme.textMuted, 0.3)}`,
    color: theme.text,
};
const imageColumnStyle: React.CSSProperties = { 
    background: `linear-gradient(${hexToRgba(theme.primaryDark, 0.6)}, ${hexToRgba(theme.primaryDark, 0.6)}), url('/portada.jpeg')`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center', 
    padding: '48px 32px', 
    color: theme.text
};
const logoStyle: React.CSSProperties = { height: 100, width: 'auto', marginBottom: '24px' }; // Ajuste de tamaño base
const titleStyle: React.CSSProperties = { 
    color: theme.text,
    textShadow: '0 2px 5px rgba(0,0,0,0.6)', 
    maxWidth: 600, 
    marginBottom: '16px', 
    fontSize: '2.5rem',
    fontWeight: 700, 
    lineHeight: 1.2 
};
const subtitleStyle: React.CSSProperties = { 
    color: theme.textLight,
    maxWidth: 500, 
    fontSize: '1.1rem' 
};

export const LoginView: React.FC = () => {

    const { form, loading, isBlocked, timeLeft, onFinish } = useLoginForm();

    const screens = useBreakpoint();
    
    const responsiveImageColStyle = {
        ...imageColumnStyle,
        padding: screens.md ? '48px' : '32px 24px',
    };
    const responsiveLogoStyle = {
        ...logoStyle,
        height: screens.md ? 120 : 80,
    };
    const responsiveTitleStyle = {
        ...titleStyle,
        fontSize: screens.lg ? '2.8rem' : (screens.md ? '2.5rem' : (screens.sm ? '2.2rem' : '2rem')), 
    };
    const responsiveSubtitleStyle = {
        ...subtitleStyle,
        fontSize: screens.lg ? '1.2rem' : (screens.md ? '1.1rem' : '1rem') 
    };


    return (
        <ConfigProvider theme={{ 
            token: { 
                colorPrimary: theme.secondary,
                colorTextPlaceholder: theme.textLight,
                colorText: theme.textLight,
            } 
        }}>
            <Flex justify="center" align="center" style={mainFlexStyle}>
                <Card style={cardStyle} bodyStyle={{ padding: 0 }}>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} style={responsiveImageColStyle}>
                            <Typography.Title level={1} style={responsiveTitleStyle}>
                                Gestión Inteligente de Invernaderos
                            </Typography.Title>
                            <Typography.Paragraph style={responsiveSubtitleStyle}>
                                Monitoreo y control en tiempo real para optimizar tus cultivos.
                            </Typography.Paragraph>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Flex justify="center" align="center" style={formColumnStyle}>
                                <div style={formWrapperStyle}>
                                    <Flex vertical align="center" style={{ marginBottom: '32px' }}>
                                        <img
                                            style={responsiveLogoStyle}
                                            alt="Logo UTEQ"
                                            src="/logo.png"
                                        />
                                        <Typography.Title level={2} style={{ color: theme.text, margin: 0 }}>
                                            Iniciar Sesión
                                        </Typography.Title>
                                    </Flex>

                                    <Form 
                                        form={form} 
                                        name="login" 
                                        onFinish={onFinish} 
                                        autoComplete="off" 
                                        layout="vertical"
                                    >
                                        <Form.Item name="email" rules={[{ required: true, message: 'Por favor, ingresa tu correo' }, { type: 'email', message: 'El correo no es válido' }]}>
                                            <Input 
                                                prefix={<UserOutlined style={{ color: theme.textMuted }} />} 
                                                placeholder="Correo Electrónico" 
                                                size="large" 
                                                disabled={isBlocked} 
                                                style={inputStyle}
                                            />
                                        </Form.Item>
                                        <Form.Item name="password" rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}>
                                            <Input.Password 
                                                prefix={<LockOutlined style={{ color: theme.textMuted }} />} 
                                                placeholder="Contraseña" 
                                                size="large" 
                                                disabled={isBlocked} 
                                                style={inputStyle}
                                            />
                                        </Form.Item>

                                        {isBlocked && timeLeft && (
                                            <Typography.Text type="danger" style={{ textAlign: 'center', display: 'block', marginBottom: '12px' }}>
                                                Intente de nuevo en {timeLeft}
                                            </Typography.Text>
                                        )}

                                        <Form.Item>
                                            <Button 
                                                type="primary" 
                                                htmlType="submit" 
                                                block 
                                                size="large" 
                                                loading={loading} 
                                                disabled={isBlocked || loading} 
                                                style={{
                                                    borderRadius: '12px',
                                                    height: '48px',
                                                    fontWeight: 500,
                                                    border: 'none',
                                                }}
                                            >
                                                Entrar
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Flex>
                        </Col>
                    </Row>
                </Card>
            </Flex>
        </ConfigProvider>
    );
};