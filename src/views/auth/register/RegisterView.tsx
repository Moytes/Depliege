import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Flex, Grid, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { SHA256 } from 'crypto-js'; 
import { registerUser } from '../../../services/auth/registro/authService';
import { RegisterUserData } from '../../../types/auth/registro/auth';
import axios from 'axios';

const { useBreakpoint } = Grid;

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
            const hashedPassword = SHA256(values.password).toString();
            const userData: RegisterUserData = {
                UserName: values.name,
                Mail: values.email,
                Password: hashedPassword
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
        <Card
            title={<Typography.Title level={4} style={{ margin: 0 }}>Crear una Cuenta</Typography.Title>}
            style={{ width: screens.xs ? '100%' : 500, maxWidth: '95vw' }}
        >
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label="Nombre de Usuario"
                    rules={[
                        { required: true, message: 'Por favor, ingresa tu nombre de usuario' },
                        { min: 4, max: 25, message: 'El nombre debe tener entre 4 y 25 caracteres' }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Ej: juan.perez" size="large" />
                </Form.Item>
                
                <Form.Item
                    name="email"
                    label="Correo Electrónico"
                    rules={[{ type: 'email', message: 'El correo no es válido' }, { required: true, message: 'Por favor, ingresa tu correo' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="tu-correo@ejemplo.com" size="large" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Crea una contraseña segura" size="large" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirmar Contraseña"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Por favor, confirma tu contraseña' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) { return Promise.resolve(); }
                                return Promise.reject(new Error('Las contraseñas no coinciden'));
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Repite la contraseña" size="large"/>
                </Form.Item>

                <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                        Registrar Cuenta
                    </Button>
                </Form.Item>

                <Flex justify='center' style={{marginTop: '16px'}}>
                    <Button type="link" icon={<ArrowLeftOutlined />} onClick={onBackToLogin}>
                        Volver a Iniciar Sesión
                    </Button>
                </Flex>
            </Form>
        </Card>
    );
};