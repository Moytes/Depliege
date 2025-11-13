import React from 'react';
import { Typography, Row, Col, Image, Space, Grid, Flex } from 'antd';
import { InstagramOutlined, LinkedinOutlined, FacebookOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { theme } from '../../../../theme/landing/invernadero/theme';

const { Title, Link, Text } = Typography;

interface FooterContentProps {
  screens: ReturnType<typeof Grid.useBreakpoint>;
}

export const FooterDesktop: React.FC<FooterContentProps> = ({ screens }) => {

  const columnTitleStyle: React.CSSProperties = {
    color: theme.text,
    marginBottom: '20px',
    fontSize: screens.lg ? '18px' : '16px',
    fontWeight: 600,
    background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  };

  const iconSize = screens.lg ? '20px' : '18px';
  const logoHeight = screens.lg ? '45px' : '40px'; 

  const iconStyle: React.CSSProperties = {
    fontSize: iconSize, 
    color: theme.textLight,
    transition: 'all 0.3s ease',
  };

  const linkStyle: React.CSSProperties = {
    color: theme.textLight,
    fontSize: screens.lg ? '15px' : '14px',
    transition: 'all 0.3s ease',
  };

  return (
    <Row gutter={[48, 32]} justify="space-around" align="top">
      
      <Col xs={24} md={8} lg={6}>
        <Flex vertical align="center" gap="middle">
          <Image
            src="/logo.png"
            alt="Logo Invernaderos UTEQ"
            preview={false}
            style={{
              height: logoHeight, 
              width: 'auto', 
              borderRadius: '12px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
            }}
          />
          
          <Text style={{ 
            ...linkStyle, 
            marginBottom: '16px',
            maxWidth: '280px',
            textAlign: 'center',
            lineHeight: 1.6,
          }}>
            Sistema inteligente de control climático para optimizar la producción agrícola mediante tecnología de vanguardia.
          </Text>
        </Flex>
      </Col>

      <Col xs={24} md={8} lg={6}>
        <Flex vertical align="center" gap="small">
          <Title level={5} style={columnTitleStyle}>
            Conecta con Nosotros
          </Title>
          <Space size="middle">
            <Link 
              href="https://www.facebook.com/InfoUTEQ" 
              target="_blank" 
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.secondary;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.textLight;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FacebookOutlined style={iconStyle} />
            </Link>
            <Link 
              href="https://www.instagram.com/uteq_oficial/?__pwa=1" 
              target="_blank" 
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.secondary;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.textLight;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <InstagramOutlined style={iconStyle} />
            </Link>
            <Link 
              href="https://www.linkedin.com/school/uteq/posts/?feedView=all" 
              target="_blank" 
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.secondary;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.textLight;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <LinkedinOutlined style={iconStyle} />
            </Link>
          </Space>
        </Flex>
      </Col>

      <Col xs={24} md={8} lg={6}>
        <Flex vertical align="center" gap="middle">
          <Flex vertical align="center" gap="small">
            <Title level={5} style={columnTitleStyle}>
              Contacto
            </Title>
            <Flex vertical gap="middle" align="center">
              <Flex align="center" gap="small">
                <MailOutlined style={{ ...iconStyle, color: theme.secondary }} />
                <Text style={linkStyle}>contacto@UTEQ</Text>
              </Flex>
              <Flex align="center" gap="small">
                <PhoneOutlined style={{ ...iconStyle, color: theme.accent }} />
                <Text style={linkStyle}>+593 2 123 4567</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex vertical align="center" gap="small">
            <Title level={5} style={columnTitleStyle}>
              Ubicación
            </Title>
            <Flex align="center" gap="small">
              <EnvironmentOutlined style={{ ...iconStyle, color: theme.textLight }} />
              <Text style={{ ...linkStyle, textAlign: 'center' }}>
                Universidad Tecnológica de Querétaro
                <br />
                Av. Pie de la Cuesta 2501, Nacional,
                <br />
                76148 Santiago de Querétaro, Qro.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Col>

    </Row>
  );
};