import React, { useState } from 'react';
import {Card,Row,Col,Avatar,Typography,Button,Modal,Form,Input,message,Divider,Space} from 'antd';
import { UserOutlined, EditOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const userData = {
    name: 'Moisés Godínez',
    email: 'admin@uteq.edu.mx',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
};


export const AdminProfileView: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const onFinish = (values: any) => {
        console.log('Valores del formulario:', values);
        message.success('¡Contraseña actualizada correctamente!');
        handleCancel();
    };

    return (
        <>
            <Card title="Perfil de Administrador" bordered={false}>
                <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} md={6} style={{ textAlign: 'center' }}>
                        <Avatar
                            size={{ xs: 80, sm: 100, md: 120, lg: 140, xl: 160 }}
                            icon={<UserOutlined />}
                            src={userData.avatarUrl} 
                        />
                    </Col>

                    <Col xs={24} md={18}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <div>
                                <Title level={3} style={{ marginBottom: 0 }}>
                                    {userData.name}
                                </Title>
                                <Text type="secondary">{userData.email}</Text>
                            </div>
                            <Divider />
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={showModal}
                            >
                                Cambiar Contraseña
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Cambiar Contraseña"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ marginTop: '24px' }}
                >
                    <Form.Item
                        name="currentPassword"
                        label="Contraseña Actual"
                        rules={[{ required: true, message: 'Por favor, ingresa tu contraseña actual.' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña actual" />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="Nueva Contraseña"
                        rules={[{ required: true, message: 'Por favor, ingresa la nueva contraseña.' }]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Nueva contraseña" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirmar Nueva Contraseña"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Por favor, confirma la nueva contraseña.' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('¡Las contraseñas no coinciden!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirmar contraseña" />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                        <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Actualizar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};