import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface SensorStatisticProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    unit: string;
    color: string;
    trend: number;
}

const getDarkerShade = (hexColor: string) => {
    if (hexColor === '#fa8c16') return '#d46b08'; 
    if (hexColor === '#1890ff') return '#0050b3'; 
    if (hexColor === '#874d00') return '#613400'; 
    return hexColor;
};

export const SensorStatisticCalido: React.FC<SensorStatisticProps> = ({ icon, title, value, unit, color, trend }) => {
    const isPositive = trend >= 0;
    const gradientEndColor = getDarkerShade(color);

    return (
        <Card style={{
            borderRadius: '16px',
            color: 'white',
            background: `linear-gradient(135deg, ${color} 0%, ${gradientEndColor} 100%)`,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15), 0 15px 30px rgba(0,0,0,0.15)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.1)';
        }}
        >
            <Row align="middle" gutter={20}>
                <Col>
                    <div style={{ fontSize: '40px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                        {icon}
                    </div>
                </Col>
                <Col>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{title}</Text>
                    <Title level={2} style={{ margin: 0, color: 'white', letterSpacing: '-1px' }}>{value}{unit}</Title>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                        {isPositive ? 
                            <ArrowUpOutlined style={{ color: '#b7eb8f' }}/> : 
                            <ArrowDownOutlined style={{ color: '#ffccc7' }}/>
                        }
                        <Text style={{ color: 'white', marginLeft: '4px', fontWeight: 'bold' }}>
                            {Math.abs(trend)}%
                        </Text>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.7)', marginLeft: '8px' }}>
                            última hora
                        </Text>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};