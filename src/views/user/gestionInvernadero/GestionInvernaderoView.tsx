import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
// Se importa el nuevo ícono de flecha
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons'; 
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export const GestionInvernaderoView: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: 'calc(100vh - 128px)' }}>
            {/* Se agrega position: 'relative' para posicionar el ícono dentro de la tarjeta */}
            <Card bordered={false} style={{ textAlign: 'center', marginBottom: '24px', position: 'relative' }}>
                
                {/* --- Flecha para regresar al inicio --- */}
                <ArrowLeftOutlined 
                    onClick={() => navigate('/user/welcome')} // Navega a la ruta raíz
                    style={{ 
                        position: 'absolute', // Posicionamiento absoluto
                        top: '24px',          // Ajuste vertical
                        left: '24px',         // Ajuste horizontal
                        fontSize: '24px',     // Tamaño del ícono
                        cursor: 'pointer'     // Cambia el cursor a una mano
                    }} 
                />
                {/* --- Fin de la flecha --- */}
                
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

        </div>
    );
};