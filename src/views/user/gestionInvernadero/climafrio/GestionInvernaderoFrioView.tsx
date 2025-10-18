import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const GestionInvernaderoFrioView: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Title level={2}>Gestión del Invernadero de Clima Frío</Title>
                <Paragraph>
                    Aquí se mostrarán los controles y el monitoreo específico para el invernadero de clima frío.
                </Paragraph>
            </Card>
        </div>
    );
};