import React from 'react';
import { Typography, Row, Col, Space } from 'antd';
import { ArrowLeftOutlined, FireOutlined, ExperimentOutlined, GatewayOutlined } from '@ant-design/icons'; 
import { useNavigate } from 'react-router-dom';
import { SensorStatisticCalido } from '../../../../components/user/gestioninvernaderocalido/SensorStatisticCalido';
import { SensorChartCalido } from '../../../../components/user/gestioninvernaderocalido/SensorChartCalido';

const { Title, Paragraph } = Typography;

const historicalData = [
    { time: '10:00', temperatura: 26, humedadAire: 75, humedadSuelo: 60 },
    { time: '11:00', temperatura: 28, humedadAire: 70, humedadSuelo: 55 },
    { time: '12:00', temperatura: 30, humedadAire: 65, humedadSuelo: 50 },
    { time: '13:00', temperatura: 31, humedadAire: 62, humedadSuelo: 45 },
    { time: '14:00', temperatura: 29, humedadAire: 68, humedadSuelo: 42 },
    { time: '15:00', temperatura: 27, humedadAire: 72, humedadSuelo: 38 },
];
const currentTemperature = 27.5;
const currentAirHumidity = 72;
const currentSoilHumidity = 38;

export const GestionInvernaderoCalidoView: React.FC = () => {
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
                            <Title level={2} style={{ margin: 0 }}>Dashboard: Invernadero Cálido</Title>
                            <Paragraph type="secondary" style={{ margin: 0 }}>Monitoreo de riego y control de temperatura.</Paragraph>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <SensorChartCalido
                        title="Historial de Sensores"
                        data={historicalData}
                        tempDataKey="temperatura"
                        airHumidityDataKey="humedadAire"
                        soilHumidityDataKey="humedadSuelo"
                        optimalTempMin={24}
                        optimalTempMax={29}
                    />
                </Col>
                
                <Col xs={24} lg={8}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <SensorStatisticCalido
                            icon={<FireOutlined />} 
                            title="Temperatura Actual"
                            value={currentTemperature}
                            unit="°C"
                            color="#fa8c16" 
                            trend={-2.1}
                        />
                        <SensorStatisticCalido
                            icon={<ExperimentOutlined />} 
                            title="Humedad del Aire"
                            value={currentAirHumidity}
                            unit="%"
                            color="#1890ff"
                            trend={3.0}
                        />
                        <SensorStatisticCalido
                            icon={<GatewayOutlined />} 
                            title="Humedad del Suelo"
                            value={currentSoilHumidity}
                            unit="%"
                            color="#874d00" 
                            trend={-4.5}
                        />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};