import React, { useState, useMemo } from 'react'; 
import { Card, Typography, Radio, Alert } from 'antd';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea } from 'recharts';

const { Title } = Typography;

interface SensorChartProps {
    title: string;
    data: any[]; 
    tempDataKey: string;
    humidityDataKey: string;
    luminosityDataKey: string; 
    optimalTempMin: number;
    optimalTempMax: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'rgba(30, 30, 30, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '12px',
                borderRadius: '12px',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{`Hora: ${label}`}</p>
                {payload.map((pld: any, index: number) => (
                    <p key={index} style={{ margin: '4px 0 0', color: pld.stroke }}>
                        {`${pld.name}: ${pld.value}${pld.unit || ''}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export const SensorChart: React.FC<SensorChartProps> = ({ 
    title, data, tempDataKey, humidityDataKey, 
    luminosityDataKey, 
    optimalTempMin, optimalTempMax 
}) => {
    const [range, setRange] = useState('24h');
    const axisAndLegendTextColor = '#a0a0a0'; 

    const filteredData = useMemo(() => {
        if (!data || data.length === 0) return [];
        const now = new Date().getTime();
        let cutoffTime: number;

        switch(range) {
            case '7d':
                cutoffTime = now - 7 * 24 * 60 * 60 * 1000;
                break;
            case '30d':
                cutoffTime = now - 30 * 24 * 60 * 60 * 1000;
                break;
            case '24h':
            default:
                cutoffTime = now - 24 * 60 * 60 * 1000;
                break;
        }

        return data.filter((d: any) => {
            const itemTime = new Date(d.timestamp).getTime();
            if (isNaN(itemTime)) {
                console.warn(`Timestamp inválido: ${d.timestamp}`);
                return false;
            }
            return itemTime >= cutoffTime;
        });
    }, [data, range]); 

    if (filteredData.length === 0) {
        return (
            <Card 
                title={<Title level={4} style={{ color: '#ffffff', margin: 0 }}>{title}</Title>}
                style={{
                    borderRadius: '16px',
                    background: '#1f1f1f',
                    border: '1px solid #303030',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                }}
            >
                <Alert message="No hay datos disponibles para este rango." type="info" showIcon />
            </Card>
        );
    }

    return (
        <Card 
            title={<Title level={4} style={{ color: '#ffffff', margin: 0 }}>{title}</Title>}
            extra={
                <Radio.Group value={range} onChange={e => setRange(e.target.value)}>
                    <Radio.Button value="24h">24h</Radio.Button>
                    <Radio.Button value="7d">7d</Radio.Button>
                    <Radio.Button value="30d">30d</Radio.Button>
                </Radio.Group>
            }
            style={{
                borderRadius: '16px',
                background: '#1f1f1f',
                border: '1px solid #303030',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            }}
        >
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.7}/>
                                <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1890ff" stopOpacity={0.7}/>
                                <stop offset="95%" stopColor="#1890ff" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorLuminosity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#faad14" stopOpacity={0.7}/>
                                <stop offset="95%" stopColor="#faad14" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis dataKey="time" tick={{ fill: axisAndLegendTextColor }} />
                        <YAxis tick={{ fill: axisAndLegendTextColor }} domain={['dataMin - 2', 'dataMax + 2']} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                        <Legend wrapperStyle={{ color: axisAndLegendTextColor }} />

                        <ReferenceArea 
                            y1={optimalTempMin} 
                            y2={optimalTempMax} 
                            stroke="transparent" 
                            fill="#52c41a" 
                            fillOpacity={0.15} 
                            label={{ 
                                value: 'Zona Óptima', 
                                position: 'insideTopLeft', 
                                fill: '#91d5ff', 
                                fontSize: 12,
                                dy: 10, 
                                dx: 10 
                            }} 
                        />
                        
                        <Area type="monotone" dataKey={tempDataKey} stroke="#ff4d4f" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" name="Temperatura" unit="°C" />
                        <Area type="monotone" dataKey={humidityDataKey} stroke="#1890ff" strokeWidth={3} fillOpacity={1} fill="url(#colorHumidity)" name="Humedad" unit="%" />
                        <Area type="monotone" dataKey={luminosityDataKey} stroke="#faad14" strokeWidth={3} fillOpacity={1} fill="url(#colorLuminosity)" name="Luminosidad" unit=" lx" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};