import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Space, Spin, Alert } from 'antd';
import { ArrowLeftOutlined, FireOutlined, ExperimentOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { SensorStatistic } from '../../../../components/user/gestioninvernaderofrio/SensorStatistic';
import { SensorChart } from '../../../../components/user/gestioninvernaderofrio/SensorChart';
import axios from 'axios'; 

const { Title, Paragraph } = Typography;

interface ApiSensorReading {
    createdAt: string; 
    temperature_cold: number; 
    humidity_cold: number; 
}
interface FormattedSensorData {
    time: string; 
    temperatura: number;
    humedad: number;
    timestamp: string;
}

const getAuthToken = (): string => {
    return localStorage.getItem('authToken') || '';
};


export const GestionInvernaderoFrioView: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 

    const [historicalData, setHistoricalData] = useState<FormattedSensorData[]>([]);
    const [currentTemperature, setCurrentTemperature] = useState<number>(0);
    const [currentHumidity, setCurrentHumidity] = useState<number>(0);
    const [tempTrend, setTempTrend] = useState<number>(0);
    const [humidityTrend, setHumidityTrend] = useState<number>(0);

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
                const response = await axios.get<ApiSensorReading[]>(
                    `/api/Greenhouse/GetColdDataByGreenhouseId/${id}`,
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
                        temperatura: d.temperature_cold,
                        humedad: d.humidity_cold,
                        timestamp: d.createdAt 
                    }));
                    setHistoricalData(formattedData);

                    const latestData = sortedData[sortedData.length - 1];
                    setCurrentTemperature(latestData.temperature_cold);
                    setCurrentHumidity(latestData.humidity_cold);

                    if (sortedData.length > 1) {
                        const previousData = sortedData[sortedData.length - 2];
                        setTempTrend(latestData.temperature_cold - previousData.temperature_cold);
                        setHumidityTrend(latestData.humidity_cold - previousData.humidity_cold);
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
                            <Title level={2} style={{ margin: 0 }}>Dashboard: Invernadero Frío</Title>
                            <Paragraph type="secondary" style={{ margin: 0 }}>Visualización de datos en tiempo real (ID: {id})</Paragraph>
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
                                    trend={tempTrend} 
                                />
                                <SensorStatistic
                                    icon={<ExperimentOutlined />} 
                                    title="Humedad Actual"
                                    value={currentHumidity} 
                                    unit="%"
                                    color="#1890ff"
                                    trend={humidityTrend} 
                                />
                            </Space>
                        </Col>
                    </Row>
                )}
            </Spin>
        </div>
    );
};