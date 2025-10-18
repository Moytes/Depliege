import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { BugOutlined, FundViewOutlined, ControlOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 

const { Title, Paragraph } = Typography;

export const GestionInvernaderoView: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: 'calc(100vh - 128px)' }}>
            <Card bordered={false} style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Title level={2}>Bienvenido a la Gestión del Invernadero</Title>
                <Paragraph type="secondary">
                    Selecciona el tipo de invernadero que deseas gestionar.
                </Paragraph>
            </Card>

            <Row gutter={[16, 16]}>
               
                <Col xs={24} sm={12}>
                    <Card
                        hoverable
                        onClick={() => navigate('/user/gestion-invernadero/frio')}
                    >
                        <HomeOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                        <Title level={4}>Gestión Invernadero Frío</Title>
                        <Paragraph>Controla y monitorea el ambiente de clima frío.</Paragraph>
                    </Card>
                </Col>

                <Col xs={24} sm={12}>
                    <Card
                        hoverable
                        onClick={() => navigate('/user/gestion-invernadero/calido')} 
                    >
                        <HomeOutlined style={{ fontSize: '32px', color: '#faad14' }} />
                        <Title level={4}>Gestión Invernadero Cálido</Title>
                        <Paragraph>Gestiona el riego, temperatura y humedad del clima cálido.</Paragraph>
                    </Card>
                </Col>
            </Row>

            <Title level={3} style={{ marginTop: '48px', textAlign: 'center', color: '#888' }}>
                Accesos directos
            </Title>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <Card hoverable>
                        <FundViewOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                        <Title level={4}>Monitoreo en Vivo</Title>
                        <Paragraph>Visualiza datos en tiempo real de los sensores.</Paragraph>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card hoverable>
                        <ControlOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                        <Title level={4}>Control de Actuadores</Title>
                        <Paragraph>Gestiona la ventilación, riego y otros sistemas.</Paragraph>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card hoverable>
                        <BugOutlined style={{ fontSize: '32px', color: '#faad14' }} />
                        <Title level={4}>Gestión de Plagas</Title>
                        <Paragraph>Registra y controla las plagas detectadas.</Paragraph>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};