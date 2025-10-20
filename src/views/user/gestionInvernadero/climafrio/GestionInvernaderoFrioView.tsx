import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import { ArrowLeftOutlined, FireOutlined, ExperimentOutlined } from '@ant-design/icons'; 
import { useNavigate } from 'react-router-dom';
import { SensorStatistic } from '../../../../components/user/gestioninvernaderofrio/SensorStatistic';
import { SensorChart } from '../../../../components/user/gestioninvernaderofrio/SensorChart';

const { Title, Paragraph } = Typography;

const historicalData = [
    { time: '10:00', temperatura: 18, humedad: 65 },
    { time: '11:00', temperatura: 19.5, humedad: 62 },
    { time: '12:00', temperatura: 20, humedad: 60 },
    { time: '13:00', temperatura: 21.2, humedad: 58 },
    { time: '14:00', temperatura: 20.5, humedad: 59 },
    { time: '15:00', temperatura: 19.8, humedad: 63 },
];
const currentTemperature = 19.8;
const currentHumidity = 63;

export const GestionInvernaderoFrioView: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
            
            <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
                <Col>
                    <Space align="center" size="middle">
                        <ArrowLeftOutlined 
                            style={{ fontSize: '24px', cursor: 'pointer', color: '#595959' }}
                            onClick={() => navigate('/user/gestion-invernadero')}
                        />
                        <div>
                            <Title level={2} style={{ margin: 0 }}>Dashboard: Invernadero Frío</Title>
                            <Paragraph type="secondary" style={{ margin: 0 }}>Visualización de datos en tiempo real.</Paragraph>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <SensorChart
                        title="Historial de Sensores"
                        data={historicalData}
                        tempDataKey="temperatura"
                        humidityDataKey="humedad"
                        optimalTempMin={16}
                        optimalTempMax={22}
                    />
                </Col>
                
                <Col xs={24} lg={8}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <SensorStatistic
                            icon={<FireOutlined />} 
                            title="Temperatura Actual"
                            value={currentTemperature}
                            unit="°C"
                            color="#ff4d4f"
                            trend={-1.2}
                        />
                        <SensorStatistic
                            icon={<ExperimentOutlined />} 
                            title="Humedad Actual"
                            value={currentHumidity}
                            unit="%"
                            color="#1890ff"
                            trend={2.5}
                        />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};