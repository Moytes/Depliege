import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Avatar, Typography, Button, Modal, Form, Input, Divider, Space, Skeleton, Tag, Grid } from 'antd';
import { UserOutlined, EditOutlined, LockOutlined, MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useAdminProfile } from '../../../../hook/admin/perfile/useAdminProfile';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export const AdminProfileView: React.FC = () => {
    const screens = useBreakpoint();
    
    const { user, loading, handleChangePassword, handleUpdateInfo } = useAdminProfile();

    const [isPassModalVisible, setIsPassModalVisible] = useState(false);
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
    const [passForm] = Form.useForm();
    const [infoForm] = Form.useForm();

    useEffect(() => {
        if (user && isInfoModalVisible) {
            infoForm.setFieldsValue({
                userName: user.userName,
                mail: user.mail
            });
        }
    }, [user, isInfoModalVisible, infoForm]);

    const onFinishPassword = async (values: any) => {
        const success = await handleChangePassword(values.currentPassword, values.newPassword);
        if (success) {
            setIsPassModalVisible(false);
            passForm.resetFields();
        }
    };

    const onFinishInfo = async (values: any) => {
        const success = await handleUpdateInfo(values);
        if (success) {
            setIsInfoModalVisible(false);
        }
    };

    if (loading && !user) {
        return <Card bordered={false}><Skeleton avatar active paragraph={{ rows: 4 }} /></Card>;
    }

    return (
        <div style={{ padding: screens.md ? '24px' : '12px', maxWidth: '1000px', margin: '0 auto' }}>
            <Card 
                title="Mi Perfil" 
                bordered={false} 
                style={{ 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    borderRadius: '8px'
                }}
                bodyStyle={{ padding: screens.md ? '24px' : '16px' }}
            >
                <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                        <Avatar
                            size={screens.md ? 120 : 100}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#1890ff' }}
                        />
                        <div style={{ marginTop: 16 }}>
                            <Tag 
                                color="gold" 
                                icon={<SafetyCertificateOutlined />} 
                                style={{ fontSize: '14px', padding: '4px 10px' }}
                            >
                                {user?.role === 1 ? 'Administrador' : 'Usuario'}
                            </Tag>
                        </div>
                    </Col>

                    <Col xs={24} md={16} style={{ textAlign: screens.md ? 'left' : 'center' }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <div>
                                <Text type="secondary">Nombre de Usuario</Text>
                                <Title level={screens.md ? 4 : 5} style={{ margin: 0 }}>
                                    {user?.userName || 'Usuario'}
                                </Title>
                            </div>

                            <div>
                                <Text type="secondary">Correo Electrónico</Text>
                                <div style={{ fontSize: screens.md ? '16px' : '15px', wordBreak: 'break-all' }}>
                                    {user?.mail || 'correo@ejemplo.com'}
                                </div>
                            </div>

                            <Divider style={{ margin: '12px 0' }} />

                            <Space 
                                wrap 
                                style={{ width: '100%', justifyContent: screens.md ? 'flex-start' : 'center' }}
                                size={screens.md ? 'middle' : 'small'}
                            >
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => setIsInfoModalVisible(true)}
                                    size={screens.md ? 'middle' : 'large'}
                                >
                                    Editar Datos
                                </Button>

                                <Button
                                    type="primary"
                                    icon={<LockOutlined />}
                                    onClick={() => setIsPassModalVisible(true)}
                                    size={screens.md ? 'middle' : 'large'}
                                >
                                    Cambiar Contraseña
                                </Button>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Editar Información Personal"
                open={isInfoModalVisible}
                onCancel={() => setIsInfoModalVisible(false)}
                footer={null}
                destroyOnClose
                width={screens.xs ? '100%' : 520}
                style={{ top: screens.xs ? 10 : 100, maxWidth: 'calc(100% - 20px)', margin: '0 auto' }}
            >
                <Form form={infoForm} layout="vertical" onFinish={onFinishInfo}>
                    <Form.Item
                        name="userName"
                        label="Nombre de Usuario"
                        rules={[{ required: true, message: 'El nombre es obligatorio' }, { min: 4, max: 25, message: 'Entre 4 y 25 caracteres' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nuevo nombre de usuario" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="mail"
                        label="Correo Electrónico"
                        rules={[{ required: true, message: 'El correo es obligatorio' }, { type: 'email', message: 'Correo inválido' }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Nuevo correo electrónico" size="large" />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right', marginTop: 24 }}>
                        <Space>
                            <Button onClick={() => setIsInfoModalVisible(false)}>Cancelar</Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Guardar Cambios
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Seguridad de la Cuenta"
                open={isPassModalVisible}
                onCancel={() => { setIsPassModalVisible(false); passForm.resetFields(); }}
                footer={null}
                destroyOnClose
                width={screens.xs ? '100%' : 520}
                style={{ top: screens.xs ? 10 : 100, maxWidth: 'calc(100% - 20px)', margin: '0 auto' }}
            >
                <Form form={passForm} layout="vertical" onFinish={onFinishPassword}>
                    <Form.Item
                        name="currentPassword"
                        label="Contraseña Actual"
                        rules={[{ required: true, message: 'Requerida para autorizar el cambio' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Ingresa tu contraseña actual" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="Nueva Contraseña"
                        rules={[{ required: true, message: 'Ingresa la nueva contraseña' }, { min: 8, message: 'Mínimo 8 caracteres' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Nueva contraseña" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Confirma tu contraseña' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Repite la nueva contraseña" size="large" />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right', marginTop: 24 }}>
                        <Space>
                            <Button onClick={() => setIsPassModalVisible(false)}>Cancelar</Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Actualizar Contraseña
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};