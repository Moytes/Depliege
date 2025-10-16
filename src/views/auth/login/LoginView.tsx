import React from 'react';
import { Form, Input, Button, Typography, ConfigProvider, Row, Col, Grid, Flex, Card, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { useBreakpoint } = Grid;

const colors = {
    azulInstitucional: '#002D62',
    azulInstitucionalHover: '#001F44',
    azulClaroBoton: '#6699bb',
    botonPrimarioHoverFuerte: '#005a9c',
    botonPrimarioActiveFuerte: '#004a8e',
    textoNegro: '#000000',
    blanco: '#FFFFFF',
};

const mainFlexStyle: React.CSSProperties = {
    minHeight: '100vh',
    width: '100%',
    background: '#f0f2f5',
    padding: '20px',
    boxSizing: 'border-box',
};

const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1100px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    borderRadius: '16px',
    overflow: 'hidden',
};

const formColumnStyle: React.CSSProperties = {
    height: '100%',
    padding: '40px 32px',
};

const formWrapperStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
};

interface LoginViewProps {
    onLoginSuccess: (values: any) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const handleFormSubmit = (values: any) => {
        onLoginSuccess(values);
        navigate('/user/welcome');
    };

    const handleAdminLogin = () => {
        navigate('/admin');
    };

    const imageColumnStyle: React.CSSProperties = {
        background: `linear-gradient(rgba(0, 20, 40, 0.6), rgba(0, 20, 40, 0.6)), url('/portada.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: screens.md ? '48px' : '32px 24px',
        color: 'white',
    };

    const logoStyle: React.CSSProperties = {
        height: screens.md ? 120 : 80,
        width: 'auto',
        marginBottom: '24px',
    };

    const titleStyle: React.CSSProperties = {
        color: 'white',
        textShadow: '0 2px 5px rgba(0,0,0,0.6)',
        maxWidth: 600,
        marginBottom: '16px',
        fontSize: screens.lg ? '2.8rem' : (screens.md ? '2.5rem' : (screens.sm ? '2.2rem' : '2rem')),
        fontWeight: 700,
        lineHeight: 1.2,
    };

    const subtitleStyle: React.CSSProperties = {
        color: 'rgba(255, 255, 255, 0.85)',
        maxWidth: 500,
        fontSize: screens.lg ? '1.2rem' : (screens.md ? '1.1rem' : '1rem'),
    };

    return (
        <ConfigProvider theme={{
            components: {
                Button: {
                    colorText: colors.blanco,
                    colorPrimary: colors.azulClaroBoton,
                    colorPrimaryHover: colors.botonPrimarioHoverFuerte,
                    colorPrimaryActive: colors.botonPrimarioActiveFuerte,
                    primaryShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
                    colorLink: colors.azulInstitucional,
                    colorLinkHover: colors.azulInstitucionalHover,
                },
                Input: {
                    colorPrimary: colors.azulInstitucional,
                    colorPrimaryHover: colors.azulInstitucional,
                },
            },
        }}>
            <Flex justify="center" align="center" style={mainFlexStyle}>
                <Card style={cardStyle} bodyStyle={{ padding: 0 }}>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} style={imageColumnStyle}>
                            <Typography.Title level={1} style={titleStyle}>
                                Gestión Inteligente de Invernaderos
                            </Typography.Title>
                            <Typography.Paragraph style={subtitleStyle}>
                                Monitoreo y control en tiempo real para optimizar tus cultivos.
                            </Typography.Paragraph>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Flex justify="center" align="center" style={formColumnStyle}>
                                <div style={formWrapperStyle}>
                                    <Flex vertical align="center" style={{ marginBottom: '32px' }}>
                                        <img
                                            style={logoStyle}
                                            alt="Logo UTEQ"
                                            src="/logo.png"
                                        />
                                        <Typography.Title level={2} style={{ color: colors.textoNegro, margin: 0 }}>
                                            Iniciar Sesión
                                        </Typography.Title>
                                    </Flex>

                                    <Form name="login" onFinish={handleFormSubmit} autoComplete="off" layout="vertical">
                                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                            <Form.Item name="email" rules={[{ required: true, message: 'Por favor, ingresa tu correo' }, { type: 'email', message: 'El correo no es válido' }]} style={{ margin: 0 }}>
                                                <Input prefix={<UserOutlined />} placeholder="Correo Electrónico" size="large" />
                                            </Form.Item>

                                            <Form.Item name="password" rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]} style={{ margin: 0 }}>
                                                <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
                                            </Form.Item>

                                            <Button type="primary" htmlType="submit" block size="large">
                                                Entrar
                                            </Button>

                                            <Flex justify="center">
                                                <Button type="link" onClick={handleAdminLogin}>
                                                    Entrar como Administrador
                                                </Button>
                                            </Flex>
                                        </Space>
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