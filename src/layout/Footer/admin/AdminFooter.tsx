import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#003366',
    color: 'rgba(255, 255, 255, 0.65)',
};

export const AdminFooter: React.FC = () => {
    return (
        <Footer style={footerStyle}>
            <Typography.Text style={{ color: 'inherit' }}>
                ©{new Date().getFullYear()} Invernaderos UTEQ. Todos los derechos reservados.
            </Typography.Text>
        </Footer>
    );
};