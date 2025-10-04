import React from 'react';
import { Layout, Typography, Divider, Row, Col } from 'antd';


const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const footerStyle: React.CSSProperties = {
    backgroundColor: '#003366',
    color: 'rgba(255, 255, 255, 0.85)',
    padding: '48px 24px',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.15)',

    zIndex: 10,
};

const columnTitleStyle: React.CSSProperties = { /*...*/ };
const iconStyle: React.CSSProperties = { /*...*/ };
const linkStyle: React.CSSProperties = { /*...*/ };

export const AppFooter: React.FC = () => {
    return (
        <Footer style={footerStyle}>
            
            <Row gutter={[16, 48]} justify="space-around" align="top">
                <Col xs={24} sm={12} md={8}>
                    {/* ... */}
                </Col>
                <Col xs={24} sm={12} md={8}>
                    {/* ... */}
                </Col>
                <Col xs={24} sm={12} md={8}>
                    {/* ... */}
                </Col>
            </Row>
            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', margin: '40px 0 24px' }} />
            <Text style={{ textAlign: 'center', display: 'block', color: 'rgba(255, 255, 255, 0.45)' }}>
                ©{new Date().getFullYear()} Invernaderos UTEQ. Todos los derechos reservados.
            </Text>
        </Footer>
    );
};