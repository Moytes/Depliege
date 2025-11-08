import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Space, Spin, Alert, Button } from 'antd';
import { ArrowLeftOutlined, FireOutlined, ExperimentOutlined, BulbOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { SensorStatistic } from '../../../../components/user/gestioninvernaderofrio/SensorStatistic';
import { SensorChart } from '../../../../components/user/gestioninvernaderofrio/SensorChart';
import axios from 'axios';

const { Title, Paragraph } = Typography;

interface ApiSensorReading {
    time: string;
    temp_f: number;
    hum_f: number;
    lum_f: number;
}

interface FormattedSensorData {
    time: string;
    temperatura: number;
    humedad: number;
    luminosidad: number;
    timestamp: string;
}

const getAuthToken = (): string => {
    return localStorage.getItem('authToken') || '';
};

export const GestionInvernaderoFrioView: React.FC = () => {
    const navigate = useNavigate();
    const id = "DCCF9C74-5176-4F1C-BC05-40BA1550929A";

    const [historicalData, setHistoricalData] = useState<FormattedSensorData[]>([]);
    const [currentTemperature, setCurrentTemperature] = useState<number>(0);
    const [currentHumidity, setCurrentHumidity] = useState<number>(0);
    const [currentLuminosity, setCurrentLuminosity] = useState<number>(0);

    const [tempTrend, setTempTrend] = useState<number>(0);
    const [humidityTrend, setHumidityTrend] = useState<number>(0);
    const [luminosityTrend, setLuminosityTrend] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        if (!id) {
            setError("No se ha proporcionado un ID de invernadero válido.");
            setIsLoading(false);
            return;
        }

        try {
            const token = getAuthToken();
            if (!token) {
                setError("No se encontró token de autenticación. Inicia sesión de nuevo.");
                setIsLoading(false);
                return;
            }

            console.log(`Iniciando fetch a /api/Greenhouse/GetColdDataByGreenhouseId/${id} con token: ${token.substring(0, 10)}...`);

            const response = await axios.get<ApiSensorReading[]>(
                `/api/Greenhouse/GetColdDataByGreenhouseId/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Respuesta API:', response.data);

            if (response.data && response.data.length > 0) {
                const sortedData = response.data.sort((a, b) =>
                    new Date(a.time).getTime() - new Date(b.time).getTime()
                );

                const formattedData = sortedData.map(d => ({
                    time: new Date(d.time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                    temperatura: d.temp_f,
                    humedad: d.hum_f,
                    luminosidad: d.lum_f,
                    timestamp: d.time
                }));
                setHistoricalData(formattedData);

                const latestData = sortedData[sortedData.length - 1];
                setCurrentTemperature(latestData.temp_f);
                setCurrentHumidity(latestData.hum_f);
                setCurrentLuminosity(latestData.lum_f);

                if (sortedData.length > 1) {
                    const previousData = sortedData[sortedData.length - 2];
                    const calculateTrend = (current: number, previous: number): number => {
                        if (previous === 0) return current > 0 ? 100 : 0;
                        const trend = ((current - previous) / previous) * 100;
                        return parseFloat(trend.toFixed(1));
                    };
                    setTempTrend(calculateTrend(latestData.temp_f, previousData.temp_f));
                    setHumidityTrend(calculateTrend(latestData.hum_f, previousData.hum_f));
                    setLuminosityTrend(calculateTrend(latestData.lum_f, previousData.lum_f));
                }
            } else {
                setError("No se encontraron datos para este invernadero (respuesta vacía). Verifica Supabase.");
            }
        } catch (err: any) {
            console.error("Error detallado al obtener datos:", err);
            console.error("Respuesta del backend (si aplica):", err.response?.data); // Log del error custom del backend
            let errorMsg = "Error al cargar los datos del invernadero.";
            if (err.response) {
                const backendError = err.response.data;
                if (err.response.status === 404) {
                    errorMsg = backendError?.errorMessage || "Invernadero no encontrado o sin datos en Supabase (código: " + backendError?.error + ").";
                } else if (err.response.status === 401) {
                    errorMsg = backendError || "Token inválido o expirado. Inicia sesión de nuevo.";
                } else if (err.response.status === 403) {
                    errorMsg = backendError || "No tienes acceso a este invernadero (no eres el propietario).";
                } else if (err.response.status === 500) {
                    errorMsg = `Error interno: ${backendError?.detail || backendError?.errorMessage || err.message} (código: ${backendError?.title || backendError?.error || ''}).`;
                } else {
                    errorMsg = `Error ${err.response.status}: ${backendError?.errorMessage || err.message}`;
                }
            } else if (err.request) {
                errorMsg = "No se recibió respuesta del servidor (problema de red, CORS o API down).";
            } else {
                errorMsg = err.message || "Error desconocido.";
            }
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 60000);
        return () => clearInterval(intervalId);
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
                            <Paragraph type="secondary" style={{ margin: 0, fontSize: '12px', wordBreak: 'break-all' }}>
                                Visualización de datos (ID: {id})
                            </Paragraph>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Spin spinning={isLoading} tip="Cargando datos..." size="large">
                {error ? (
                    <Alert 
                        message="Error" 
                        description={error} 
                        type="error" 
                        showIcon 
                        action={<Button size="small" onClick={fetchData}>Reintentar</Button>}
                    />
                ) : historicalData.length === 0 ? (
                    <Alert message="Advertencia" description="No hay datos disponibles para mostrar. Verifica Supabase." type="warning" showIcon />
                ) : (
                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <SensorChart
                                title="Historial de Sensores"
                                data={historicalData}
                                tempDataKey="temperatura"
                                humidityDataKey="humedad"
                                luminosityDataKey="luminosidad"
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
                                <SensorStatistic
                                    icon={<BulbOutlined />}
                                    title="Luminosidad Actual"
                                    value={currentLuminosity}
                                    unit="lx"
                                    color="#faad14"
                                    trend={luminosityTrend}
                                />
                            </Space>
                        </Col>
                    </Row>
                )}
            </Spin>
        </div>
    );
};