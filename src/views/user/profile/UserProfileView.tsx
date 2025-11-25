import React from 'react';
import { Card, Form, Input, Button, Row, Col, Typography, Spin, Avatar, Divider, Flex, Grid } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, SaveOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useUserProfile } from '../../../hook/user/profile/useUserProfile';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export const UserProfileView: React.FC = () => {
    const screens = useBreakpoint();

    const { 
        form, 
        userData, 
        loading, 
        isUpdating, 
        showPasswordFields, 
        setShowPasswordFields, 
        handleUpdate 
    } = useUserProfile();

    if (loading) {
        return (
            <Flex justify="center" align="center" style={{ minHeight: '60vh' }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </Flex>
        );
    }

    return (
        <div style={{ padding: screens.md ? '24px' : '12px', maxWidth: '800px', margin: '0 auto' }}>
            <Card 
                bordered={false}
                style={{ 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    borderRadius: '12px',
                    padding: screens.md ? '0' : '-12px'
                }}
                bodyStyle={{ padding: screens.md ? '24px' : '16px' }}
            >
                <Flex justify="center" align="center" vertical gap="small" style={{ marginBottom: '32px' }}>
                    <Avatar 
                        size={screens.md ? 100 : 80} 
                        icon={<UserOutlined />}
                        style={{ backgroundColor: '#1890ff', marginBottom: 16 }}
                    />
                    <Title level={screens.md ? 3 : 4} style={{ margin: 0, textAlign: 'center' }}>
                        {userData?.userName}
                    </Title>
                    <Text type="secondary" style={{ wordBreak: 'break-all', textAlign: 'center' }}>
                        {userData?.mail}
                    </Text>
                </Flex>

                <Divider />

                <Form 
                    form={form} 
                    layout="vertical" 
                    onFinish={handleUpdate}
                    requiredMark={false}
                >
                    <Row gutter={[24, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item 
                                name="userName" 
                                label="Nombre de Usuario" 
                                rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                            >
                                <Input 
                                    prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
                                    size="large" 
                                />
                            </Form.Item>
                        </Col>
                        
                        <Col xs={24} md={12}>
                            <Form.Item 
                                name="mail" 
                                label="Correo Electrónico" 
                                rules={[{ required: true, type: 'email', message: 'Correo inválido' }]}
                            >
                                <Input 
                                    prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} 
                                    size="large" 
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div style={{ marginBottom: '24px', marginTop: '12px' }}>
                        <Flex justify="space-between" align="center" wrap="wrap" gap="small">
                            <Text strong>Seguridad</Text>
                            <Button 
                                type="link" 
                                icon={<EditOutlined />}
                                onClick={() => setShowPasswordFields(!showPasswordFields)}
                                style={{ paddingRight: 0 }}
                            >
                                {showPasswordFields ? 'Cancelar cambio' : 'Cambiar contraseña'}
                            </Button>
                        </Flex>
                        
                        {showPasswordFields && (
                            <div style={{ marginTop: '16px', padding: screens.md ? '20px' : '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                                <Row gutter={[16, 0]}>
                                    <Col xs={24} md={24}>
                                        <Form.Item 
                                            name="currentPassword" 
                                            label="Contraseña Actual"
                                            rules={[{ required: showPasswordFields, message: 'Requerida para autorizar cambios' }]}
                                        >
                                            <Input.Password 
                                                prefix={<LockOutlined />} 
                                                placeholder="Ingresa tu contraseña actual" 
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item 
                                            name="newPassword" 
                                            label="Nueva Contraseña"
                                            rules={[{ required: showPasswordFields, message: 'Ingresa la nueva contraseña' }, { min: 8, message: 'Mínimo 8 caracteres' }]}
                                        >
                                            <Input.Password 
                                                prefix={<LockOutlined />} 
                                                placeholder="Nueva contraseña" 
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item 
                                            name="confirmPassword" 
                                            label="Confirmar Contraseña"
                                            dependencies={['newPassword']}
                                            rules={[
                                                { required: showPasswordFields, message: 'Confirma la contraseña' },
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
                                            <Input.Password 
                                                prefix={<LockOutlined />} 
                                                placeholder="Repite la nueva contraseña" 
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </div>

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={isUpdating} 
                            icon={<SaveOutlined />} 
                            size="large"
                            block
                            style={{ height: '45px' }}
                        >
                            Guardar Cambios
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};