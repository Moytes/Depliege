import React from 'react';
import { Form, Input, Button, Typography, ConfigProvider, Row, Col, Grid, Flex, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { useBreakpoint } = Grid;

const colors = {
    azulInstitucional: '#003666',
    verdeSostenible: '#6699bb',
    verdeSostenibleOscuro: '#2E7D32',
};

interface LoginViewProps {
    onLoginSuccess: (values: any) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const handleFormSubmit = (values: any) => {
        console.log('Simulando inicio de sesión de usuario con:', values);
        onLoginSuccess(values);
        navigate('/user/welcome');
    };

    const handleAdminLogin = () => {
        console.log('Botón de administrador presionado. Navegando a /admin...');
        navigate('/admin');
    };


    const imageColumnStyle: React.CSSProperties = {

        background: `linear-gradient(rgba(0, 20, 40, 0.5), rgba(0, 20, 40, 0.5)), url('/portada.jpeg')`,
        backgroundSize: 'cover',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: screens.xl ? '64px' : '48px',
    };


    const formWrapperStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '400px',
    };

    const logoStyle: React.CSSProperties = {
        height: screens.md ? (screens.xl ? 100 : 80) : 70,
        width: 'auto',
        marginBottom: 16,
    };

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: colors.verdeSostenible,
                colorPrimaryHover: colors.verdeSostenibleOscuro,
            },
            components: { Input: { colorPrimary: colors.azulInstitucional, colorPrimaryHover: colors.azulInstitucional } },
        }}>
            <Flex
                justify="center"
                align="center"
                style={{
                    minHeight: '100%',
                    width: '100%',
                    background: '#f0f2f5',
                    padding: '24px',
                }}
            >
                <Card
                    style={{
                        width: '100%',
                        maxWidth: '1100px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                    }}
                    bodyStyle={{ padding: 0 }}
                >
                    <Row>
                        <Col xs={0} sm={0} md={12} lg={12} style={imageColumnStyle}>
                            <Typography.Title
                                level={1}
                                style={{
                                    color: 'white',
                                    textShadow: '0 2px 5px rgba(0,0,0,0.6)',
                                    maxWidth: 600,
                                    fontSize: screens.xl ? '3rem' : '2.2rem'
                                }}
                            >
                                Gestión Inteligente de Invernaderos
                            </Typography.Title>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Flex justify="center" align="center" style={{ height: '100%', padding: '32px 24px' }}>
                                <div style={formWrapperStyle}>
                                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                        <img
                                            style={logoStyle}
                                            alt="Logo UTEQ"
                                            src="/uteq-logo2.png"
                                        />
                                        <Typography.Title level={2} style={{ color: colors.azulInstitucional, margin: 0 }}>
                                            Iniciar Sesión
                                        </Typography.Title>
                                    </div>
                                    <Form
                                        name="login"
                                        onFinish={handleFormSubmit}
                                        autoComplete="off"
                                        layout="vertical"
                                    >
                                        <Form.Item name="email" rules={[{ required: true, message: 'Por favor, ingresa tu correo' }, { type: 'email', message: 'El correo no es válido' }]}>
                                            <Input prefix={<UserOutlined />} placeholder="Correo Electrónico" size="large" />
                                        </Form.Item>
                                        <Form.Item name="password" rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}>
                                            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
                                        </Form.Item>
                                        <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                                            <Button type="primary" htmlType="submit" block size="large">
                                                Entrar
                                            </Button>
                                        </Form.Item>
                                        <Form.Item style={{ textAlign: 'center', marginTop: '16px' }}>
                                            <Button type="link" onClick={handleAdminLogin}>
                                                Entrar como Administrador
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