import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

export const UserFooter: React.FC = () => {
    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        backgroundColor: '#f0f2f5',
    };

    return (
        <Footer style={footerStyle}>
            <Text type="secondary">
                Sistema de Gestión de Invernaderos ©{new Date().getFullYear()} UTEQ
            </Text>
        </Footer>
    );
};