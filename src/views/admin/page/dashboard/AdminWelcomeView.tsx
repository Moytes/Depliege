import React from 'react';
import { Flex, Typography } from 'antd';

const { Title, Text } = Typography;


const welcomeContainerStyle: React.CSSProperties = {
    width: '100%',
    height: 'calc(100vh - 150px)', 
    backgroundColor: '#fff',
    padding: '24px',
    textAlign: 'center'
};

export const AdminWelcomeView: React.FC = () => {
    return (
        <Flex justify="center" align="center" style={welcomeContainerStyle}>
            <div>
                <Title level={1} style={{ color: '#003666' }}>
                    Bienvenido Administrador
                </Title>
                <Text type="secondary" style={{ fontSize: '1.2rem' }}>
                    Panel de control y gestión del sistema.
                </Text>
            </div>
        </Flex>
    );
};