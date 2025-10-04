import React from 'react';
import { Form, Input, Button, Card, Typography, Flex, Grid } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, IdcardOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

interface RegisterViewProps {
    onBackToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onBackToLogin }) => {
    const [form] = Form.useForm(); // 1. Obtenemos una instancia del formulario
    const screens = useBreakpoint();

    const onFinish = (values: any) => {
        console.log('Datos de registro recibidos:', values);
        alert('¡Usuario registrado con éxito! (Simulación)');
        onBackToLogin();
    };

    // 2. Creamos una función que maneja el cambio en el input de la matrícula
    const handleMatriculaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // Usamos una expresión regular para eliminar cualquier caracter que NO sea un dígito
        const numericValue = value.replace(/\D/g, '');
        // Actualizamos el valor del campo en el formulario con el valor numérico
        form.setFieldsValue({ matricula: numericValue });
    };

    return (
        <Card
            title={<Typography.Title level={4} style={{ margin: 0 }}>Crear una Cuenta</Typography.Title>}
            style={{
                width: screens.xs ? '100%' : 500,
                maxWidth: '95vw',
            }}
        >
            <Form
                form={form} // 3. Asociamos la instancia al formulario
                name="register"
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    name="nombre"
                    label="Nombre Completo"
                    rules={[{ required: true, message: 'Por favor, ingresa tu nombre completo', whitespace: true }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Ej: Juan Pérez" size="large" />
                </Form.Item>

                <Form.Item
                    name="matricula"
                    label="Matrícula"
                    rules={[
                        { required: true, message: 'La matrícula es obligatoria' },
                        { pattern: /^\d+$/, message: 'La matrícula solo debe contener números.' }
                    ]}
                >
                    <Input
                        prefix={<IdcardOutlined />}
                        placeholder="Ej: 2021123456"
                        size="large"
                        onChange={handleMatriculaChange} // 4. Asignamos la función al evento onChange
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Correo Electrónico"
                    rules={[
                        { type: 'email', message: 'El correo no es válido' },
                        { required: true, message: 'Por favor, ingresa tu correo' },
                        { pattern: /^\S*$/, message: 'El correo no debe contener espacios.' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="tu-correo@uteq.edu.mx" size="large" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[
                        { required: true, message: 'Por favor, ingresa tu contraseña' },
                        { pattern: /^\S*$/, message: 'La contraseña no debe contener espacios.' }
                    ]}
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
                        { pattern: /^\S*$/, message: 'La contraseña no debe contener espacios.' },
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
                    <Input.Password prefix={<LockOutlined />} placeholder="Repite la contraseña" size="large"/>
                </Form.Item>

                <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit" block size="large">
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