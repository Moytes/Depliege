import React from 'react';
import { Card, Col, Row, Typography, Avatar, Space } from 'antd';
import { LineChartOutlined,ExperimentOutlined,SettingOutlined,UserOutlined} from '@ant-design/icons';

const { Title, Text } = Typography;

const userData = {
    name: 'Usuario Estándar',
    avatarUrl: 'https://randomuser.me/api/portraits/women/75.jpg',
};

const cardStyle: React.CSSProperties = {
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '24px',
};

const iconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: '16px',
    color: '#003666',
};

export const WelcomeUserView: React.FC = () => {
    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>

            <Card style={{ marginBottom: '24px', borderRadius: '12px' }}>
                <Space align="center" size="large">
                    <Avatar size={64} src={userData.avatarUrl} icon={<UserOutlined />} />
                    <div>
                        <Title level={2} style={{ marginBottom: 0 }}>
                            ¡Bienvenido de nuevo, {userData.name}!
                        </Title>
                        <Text type="secondary">
                            Aquí tienes un resumen de la actividad reciente en tus invernaderos.
                        </Text>
                    </div>
                </Space>
            </Card>

            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={8}>
                    <Card hoverable style={cardStyle}>
                        <LineChartOutlined style={iconStyle} />
                        <Title level={4}>Monitoreo en Vivo</Title>
                        <Text>Visualiza las condiciones actuales de tus cultivos.</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card hoverable style={cardStyle}>
                        <ExperimentOutlined style={iconStyle} />
                        <Title level={4}>Historial y Análisis</Title>
                        <Text>Consulta datos históricos y reportes de rendimiento.</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card hoverable style={cardStyle}>
                        <SettingOutlined style={iconStyle} />
                        <Title level={4}>Configuración</Title>
                        <Text>Gestiona tus dispositivos y ajusta las alertas.</Text>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};