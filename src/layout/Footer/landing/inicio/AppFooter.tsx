import React from 'react';
import { Layout, Typography, Divider, Row, Col, Image, Space } from 'antd';
import { InstagramOutlined, LinkedinOutlined, FacebookOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const footerStyle: React.CSSProperties = {
    backgroundColor: '#003366',
    color: 'rgba(255, 255, 255, 0.85)',
    padding: '48px 24px',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 10,
    // --- CAMBIO AQUÍ ---
    borderRadius: '15px 15px 0 0', // Redondea las esquinas superiores
};

const logoContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginBottom: '24px',
};

const columnTitleStyle: React.CSSProperties = {
    color: '#FFFFFF',
    marginBottom: '20px',
};

const iconStyle: React.CSSProperties = {
    fontSize: '24px',
    color: 'rgba(255, 255, 255, 0.85)',
    transition: 'color 0.3s',
};

export const AppFooter: React.FC = () => {
    return (
        <Footer style={footerStyle}>
            <Row gutter={[16, 48]} justify="center" align="top">
                <Col xs={24} sm={24} md={6} style={logoContainerStyle}>
                    <Image
                        width={150}
                        src="/logo.png"
                        alt="Logo Invernaderos UTEQ"
                        preview={false}
                        style={{ borderRadius: '12px' }}
                    />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={columnTitleStyle}>
                        Síguenos
                    </Title>
                    <Space size="large">
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                            <FacebookOutlined style={iconStyle} />
                        </Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                            <InstagramOutlined style={iconStyle} />
                        </Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                            <LinkedinOutlined style={iconStyle} />
                        </Link>
                    </Space>
                </Col>
            </Row>
            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', margin: '40px 0 24px' }} />
            <Text style={{ textAlign: 'center', display: 'block', color: 'rgba(255, 255, 255, 0.45)' }}>
                ©{new Date().getFullYear()} Invernaderos UTEQ. Todos los derechos reservados.
            </Text>
        </Footer>
    );
};