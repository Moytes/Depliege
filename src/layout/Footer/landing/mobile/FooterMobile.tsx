import React from 'react';
import { Typography, Row, Col, Image, Space, Grid, Flex } from 'antd';
import { InstagramOutlined, LinkedinOutlined, FacebookOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { theme } from '../../../../theme/landing/invernadero/theme';

const { Title, Link, Text } = Typography;

interface FooterContentProps {
  screens: ReturnType<typeof Grid.useBreakpoint>;
}

export const FooterMobile: React.FC<FooterContentProps> = ({ screens }) => {

  const columnTitleStyle: React.CSSProperties = {
    color: theme.text,
    marginBottom: '16px',
    fontSize: screens.xs ? '16px' : '18px',
    fontWeight: 600,
    textAlign: 'center',
    background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const iconSize = screens.xs ? '18px' : '20px';
  const logoHeight = screens.xs ? '30px' : '35px'; 

  const iconStyle: React.CSSProperties = {
    fontSize: iconSize, 
    color: theme.textLight,
    transition: 'all 0.3s ease',
  };

  const linkStyle: React.CSSProperties = {
    color: theme.textLight,
    fontSize: screens.xs ? '14px' : '15px',
    transition: 'all 0.3s ease',
  };

  return (
    <Row gutter={[24, 32]} justify="center" align="top">
      <Col xs={24}>
        <Flex vertical align="center" gap={screens.xs ? 'middle' : 'large'}>
          
          <Image
            src="/logo.png"
            alt="Logo Invernaderos UTEQ"
            preview={false}
            style={{
              height: logoHeight, 
              width: 'auto', 
              borderRadius: '10px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
            }}
          />

          <Flex vertical align="center" gap="small">
            <Title level={5} style={columnTitleStyle}>
              Contacto
            </Title>
            <Flex vertical align="center" gap="small">
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
              Síguenos
            </Title>
            <Space size="large">
              <Link 
                href="https://www.facebook.com/InfoUTE" 
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

          <Flex vertical align="center" gap="small">
            <Title level={5} style={columnTitleStyle}>
              Ubicación
            </Title>
            <Text style={{ 
              ...linkStyle, 
              textAlign: 'center',
              maxWidth: '250px',
            }}>
              Universidad Tecnológica de Querétaro
              <br />
              Av. Pie de la Cuesta 2501, Nacional,
              <br />
              76148 Santiago de Querétaro, QRO.
            </Text>
          </Flex>

        </Flex>
      </Col>
    </Row>
  );
};