import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, ConfigProvider, Row, Col, Grid, Flex, Card, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export interface LoginUserData {
    mail: string;
    password: string;
}

export interface LoginResponse {
    jwttoken: string;
    role: any; 
}

const API_URL = '/api/User/Login';

export const loginUser = async (userData: LoginUserData): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(API_URL, userData);
  return response.data;
};

export const saveToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const { useBreakpoint } = Grid;

const colors = {
    azulInstitucional: '#002D62',
    textoNegro: '#000000',
    blanco: '#FFFFFF',
};

const mainFlexStyle: React.CSSProperties = { minHeight: '100vh', width: '100%', background: '#f0f2f5', padding: '20px', boxSizing: 'border-box' };
const cardStyle: React.CSSProperties = { width: '100%', maxWidth: '1100px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', borderRadius: '16px', overflow: 'hidden' };
const formColumnStyle: React.CSSProperties = { height: '100%', padding: '40px 32px' };
const formWrapperStyle: React.CSSProperties = { width: '100%', maxWidth: '400px' };


export const LoginView: React.FC = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const [loading, setLoading] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const [timeLeft, setTimeLeft] = useState<string | null>(null);
    const [blockEndTime, setBlockEndTime] = useState<number | null>(null);
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isBlocked && blockEndTime) {
            interval = setInterval(() => {
                const now = Date.now();
                const remaining = blockEndTime - now;

                if (remaining <= 0) {
                    clearInterval(interval);
                    setIsBlocked(false);
                    setLoginAttempts(0);
                    setTimeLeft(null);
                    setBlockEndTime(null);
                } else {
                    const minutes = Math.floor((remaining / 1000) / 60);
                    const seconds = Math.floor((remaining / 1000) % 60);
                    setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
                }
            }, 1000);
        }

        return () => clearInterval(interval); 
    }, [isBlocked, blockEndTime]);


    const handleFormSubmit = async (values: any) => {
        setLoading(true);

        try {
            const hashedPassword = await sha256(values.password);
            const userData: LoginUserData = {
                mail: values.email,
                password: hashedPassword,
            };

            const response = await loginUser(userData);
            saveToken(response.jwttoken);
            const userRole = response.role;

            setLoginAttempts(0);

            if (userRole) {
                message.success('¡Inicio de sesión exitoso!');
                const roleAsString = String(userRole);
                if (roleAsString === '1') {
                    navigate('/admin');
                } else if (roleAsString === '2') {
                    navigate('/user');
                } else {
                    message.warning('Rol de usuario no reconocido. Redirigiendo a la página principal.');
                    navigate('/'); 
                }
            } else {
                throw new Error("La respuesta del servidor no incluyó un rol de usuario.");
            }

        } catch (error) {
            console.error("Fallo en el inicio de sesión:", error);
            const newAttemptCount = loginAttempts + 1;
            setLoginAttempts(newAttemptCount);

            if (newAttemptCount >= 4) {
                const endTime = Date.now() + 2 * 60 * 1000; 
                setBlockEndTime(endTime);
                setIsBlocked(true);
                message.error('Demasiados intentos fallidos. El formulario se ha bloqueado por 2 minutos.');
            } else {
                let errorMessage = `Usuario o contraseña incorrectos. Intento ${newAttemptCount} de 4.`;
                if (axios.isAxiosError(error) && error.response?.data?.errorMessage) {
                    errorMessage = `${error.response.data.errorMessage} (Intento ${newAttemptCount} de 4).`;
                }
                message.error(errorMessage);
            }

        } finally {
            setLoading(false);
        }
    };

    const imageColumnStyle: React.CSSProperties = { background: `linear-gradient(rgba(0, 20, 40, 0.6), rgba(0, 20, 40, 0.6)), url('/portada.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: screens.md ? '48px' : '32px 24px', color: 'white' };
    const logoStyle: React.CSSProperties = { height: screens.md ? 120 : 80, width: 'auto', marginBottom: '24px' };
    const titleStyle: React.CSSProperties = { color: 'white', textShadow: '0 2px 5px rgba(0,0,0,0.6)', maxWidth: 600, marginBottom: '16px', fontSize: screens.lg ? '2.8rem' : (screens.md ? '2.5rem' : (screens.sm ? '2.2rem' : '2rem')), fontWeight: 700, lineHeight: 1.2 };
    const subtitleStyle: React.CSSProperties = { color: 'rgba(255, 255, 255, 0.85)', maxWidth: 500, fontSize: screens.lg ? '1.2rem' : (screens.md ? '1.1rem' : '1rem') };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: colors.azulInstitucional } }}>
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
                                        <Form.Item name="email" rules={[{ required: true, message: 'Por favor, ingresa tu correo' }, { type: 'email', message: 'El correo no es válido' }]}>
                                            <Input prefix={<UserOutlined />} placeholder="Correo Electrónico" size="large" disabled={isBlocked} />
                                        </Form.Item>
                                        <Form.Item name="password" rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}>
                                            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" disabled={isBlocked} />
                                        </Form.Item>
                                        {isBlocked && timeLeft && (
                                            <Typography.Text type="danger" style={{ textAlign: 'center', display: 'block', marginBottom: '12px' }}>
                                                Intente de nuevo en {timeLeft}
                                            </Typography.Text>
                                        )}
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" block size="large" loading={loading} disabled={isBlocked || loading}>
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