import React, { useState, useEffect, useRef } from 'react';
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

interface GetGreenhouseDto {
    id: string;
    // Agrega otros campos si son necesarios, como name, location, etc.
}

const getAuthToken = (): string => {
    return localStorage.getItem('authToken') || '';
};

// ErrorBoundary para capturar errores no manejados
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: any }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: any, info: any) {
        console.error("Error capturado en ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert
                    message="Error en el componente"
                    description={this.state.error?.message || "Ocurrió un error inesperado. Revisa la consola para detalles."}
                    type="error"
                    showIcon
                />
            );
        }
        return this.props.children;
    }
}

export const GestionInvernaderoFrioView: React.FC = () => {
    const navigate = useNavigate();

    const [greenhouseId, setGreenhouseId] = useState<string | null>(null);
    const [historicalData, setHistoricalData] = useState<FormattedSensorData[]>([]);
    const [currentTemperature, setCurrentTemperature] = useState<number>(0);
    const [currentHumidity, setCurrentHumidity] = useState<number>(0);
    const [currentLuminosity, setCurrentLuminosity] = useState<number>(0);

    const [tempTrend, setTempTrend] = useState<number>(0);
    const [humidityTrend, setHumidityTrend] = useState<number>(0);
    const [luminosityTrend, setLuminosityTrend] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const isMounted = useRef(false);

    const fetchGreenhousesAndData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = getAuthToken();
            if (!token) {
                setError("No se encontró token de autenticación. Inicia sesión de nuevo.");
                setIsLoading(false);
                return;
            }

            // Decodificar token para depuración
            try {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const payload = JSON.parse(atob(parts[1]));
                    console.log('Token payload (claims):', payload);
                    if (!payload.sub || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.sub)) {
                        setError("Token no tiene 'sub' claim válido o no es un GUID. Verifica el login.");
                        setIsLoading(false);
                        return;
                    }
                } else {
                    console.log('Formato de token inválido.');
                }
            } catch (decodeErr) {
                console.error('Error decodificando token:', decodeErr);
            }

            // Paso 1: Obtener los invernaderos del usuario
            console.log('Iniciando fetch a /api/Greenhouse/GetGreenhousesByUser con token: ' + token.substring(0, 10) + '...');

            const greenhousesResponse = await axios.get<GetGreenhouseDto[]>(
                '/api/Greenhouse/GetGreenhousesByUser',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Respuesta de invernaderos:', greenhousesResponse.data);

            if (greenhousesResponse.data && greenhousesResponse.data.length > 0) {
                const selectedId = greenhousesResponse.data[0].id; // Toma el primero, o implementa un selector si hay múltiples
                setGreenhouseId(selectedId);

                // Paso 2: Obtener datos fríos para el ID seleccionado
                console.log(`Iniciando fetch a /api/Greenhouse/GetColdDataByGreenhouseId/${selectedId} con token: ${token.substring(0, 10)}...`);

                const dataResponse = await axios.get<ApiSensorReading[]>(
                    `/api/Greenhouse/GetColdDataByGreenhouseId/${selectedId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                console.log('Respuesta API de datos fríos:', dataResponse.data);

                if (dataResponse.data && dataResponse.data.length > 0) {
                    const sortedData = dataResponse.data.sort((a, b) => {
                        const timeA = new Date(a.time).getTime();
                        const timeB = new Date(b.time).getTime();
                        if (isNaN(timeA) || isNaN(timeB)) {
                            console.warn('Timestamp inválido en datos:', a.time, b.time);
                            return 0;
                        }
                        return timeA - timeB;
                    });

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
                    setError("No se encontraron datos fríos para este invernadero. Verifica Supabase.");
                }
            } else {
                setError("No tienes invernaderos registrados. Crea uno primero.");
            }
        } catch (err: any) {
            console.error("Error detallado al obtener datos:", err);
            console.error("Respuesta del backend (si aplica):", err.response);
            let errorMsg = "Error al cargar los datos.";
            if (err.response) {
                const backendError = err.response.data;
                if (err.response.status === 404) {
                    errorMsg = backendError?.errorMessage || "Invernadero no encontrado o sin datos (código: " + backendError?.error + ").";
                } else if (err.response.status === 401) {
                    errorMsg = backendError || "Token inválido o expirado. Inicia sesión de nuevo.";
                } else if (err.response.status === 403) {
                    errorMsg = backendError || "No tienes acceso (verifica propiedad del invernadero).";
                } else if (err.response.status === 500) {
                    errorMsg = `Error interno: ${backendError?.detail || backendError?.errorMessage || err.message}.`;
                } else {
                    errorMsg = `Error ${err.response.status}: ${backendError?.errorMessage || err.message}`;
                }
            } else if (err.request) {
                errorMsg = "No respuesta del servidor (red/CORS/API down). Verifica Network tab.";
            } else {
                errorMsg = err.message || "Error desconocido.";
            }
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isMounted.current) {
            fetchGreenhousesAndData();
            isMounted.current = true;
        }
        // const intervalId = setInterval(fetchGreenhousesAndData, 60000); // Descomenta si refresco
        // return () => clearInterval(intervalId);
    }, []);

    return (
        <ErrorBoundary>
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
                                    Visualización de datos (ID: {greenhouseId || 'Cargando...'})
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
                            action={<Button size="small" onClick={fetchGreenhousesAndData}>Reintentar</Button>}
                        />
                    ) : historicalData.length === 0 ? (
                        <Alert message="Advertencia" description="No hay datos disponibles para mostrar. Verifica Supabase o el backend." type="warning" showIcon />
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
        </ErrorBoundary>
    );
};