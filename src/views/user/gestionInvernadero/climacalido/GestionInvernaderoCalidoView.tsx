import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Space, Spin, Alert } from 'antd';
import { ArrowLeftOutlined, FireOutlined, ExperimentOutlined, GatewayOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { SensorStatisticCalido } from '../../../../components/user/gestioninvernaderocalido/SensorStatisticCalido';
import { SensorChartCalido } from '../../../../components/user/gestioninvernaderocalido/SensorChartCalido';
import axios from 'axios'; 

const { Title, Paragraph } = Typography;
interface ApiSensorReadingHot {
    createdAt: string;
    temperature_hot: number;
    humidity_air_hot: number;
    humidity_soil_hot: number;
}
interface FormattedSensorDataHot {
    time: string;
    temperatura: number;
    humedadAire: number;
    humedadSuelo: number;
    timestamp: string;
}

const getAuthToken = (): string => {
    return localStorage.getItem('authToken') || '';
};

export const GestionInvernaderoCalidoView: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 

    const [historicalData, setHistoricalData] = useState<FormattedSensorDataHot[]>([]);
    const [currentTemperature, setCurrentTemperature] = useState<number>(0);
    const [currentAirHumidity, setCurrentAirHumidity] = useState<number>(0);
    const [currentSoilHumidity, setCurrentSoilHumidity] = useState<number>(0);
    const [tempTrend, setTempTrend] = useState<number>(0);
    const [airHumidityTrend, setAirHumidityTrend] = useState<number>(0);
    const [soilHumidityTrend, setSoilHumidityTrend] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("No se ha proporcionado un ID de invernadero.");
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = getAuthToken();
                const response = await axios.get<ApiSensorReadingHot[]>(
                    `/api/Greenhouse/GetHotDataByGreenhouseId/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data && response.data.length > 0) {
                    const sortedData = response.data.sort((a, b) =>
                        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    );

                    const formattedData = sortedData.map(d => ({
                        time: new Date(d.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                        temperatura: d.temperature_hot,
                        humedadAire: d.humidity_air_hot,
                        humedadSuelo: d.humidity_soil_hot,
                        timestamp: d.createdAt
                    }));
                    setHistoricalData(formattedData);

                    const latestData = sortedData[sortedData.length - 1];
                    setCurrentTemperature(latestData.temperature_hot);
                    setCurrentAirHumidity(latestData.humidity_air_hot);
                    setCurrentSoilHumidity(latestData.humidity_soil_hot);

                    if (sortedData.length > 1) {
                        const previousData = sortedData[sortedData.length - 2];
                        setTempTrend(latestData.temperature_hot - previousData.temperature_hot);
                        setAirHumidityTrend(latestData.humidity_air_hot - previousData.humidity_air_hot);
                        setSoilHumidityTrend(latestData.humidity_soil_hot - previousData.humidity_soil_hot);
                    }
                } else {
                    setError("No se encontraron datos para este invernadero.");
                }

            } catch (err: any) {
                console.error("Error al obtener datos:", err);
                if (err.response?.status === 404) {
                    setError("Invernadero no encontrado o sin datos.");
                } else if (err.response?.status === 401 || err.response?.status === 403) {
                    setError("No tienes permiso para ver estos datos.");
                } else {
                    setError("Error al cargar los datos del invernadero.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

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
                            <Paragraph type="secondary" style={{ margin: 0 }}>Monitoreo de riego y control de temperatura (ID: {id})</Paragraph>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Spin spinning={isLoading} tip="Cargando datos...">
                {error ? (
                    <Alert message="Error" description={error} type="error" showIcon />
                ) : (
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
                                    trend={tempTrend} 
                                />
                                <SensorStatisticCalido
                                    icon={<ExperimentOutlined />}
                                    title="Humedad del Aire"
                                    value={currentAirHumidity} 
                                    unit="%"
                                    color="#1890ff"
                                    trend={airHumidityTrend} 
                                />
                                <SensorStatisticCalido
                                    icon={<GatewayOutlined />}
                                    title="Humedad del Suelo"
                                    value={currentSoilHumidity}
                                    unit="%"
                                    color="#874d00"
                                    trend={soilHumidityTrend} 
                                />
                            </Space>
                        </Col>
                    </Row>
                )}
            </Spin>
        </div>
    );
};