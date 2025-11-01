import React from 'react';
import { Typography, Row, Col, Image, Space, Grid } from 'antd';
import { InstagramOutlined, LinkedinOutlined, FacebookOutlined } from '@ant-design/icons';

const { Title, Link } = Typography;

interface FooterContentProps {
  screens: ReturnType<typeof Grid.useBreakpoint>;
}

export const FooterMobile: React.FC<FooterContentProps> = ({ screens }) => {

  const columnTitleStyle: React.CSSProperties = {
    color: '#FFFFFF',
    marginBottom: '20px',
  };

  const iconSize = screens.sm ? '20px' : '18px';
  const logoHeight = '35px'; 

  const iconStyle: React.CSSProperties = {
    fontSize: iconSize, 
    color: 'rgba(255, 255, 255, 0.85)',
    transition: 'color 0.3s',
  };

  return (
    <Row gutter={[16, 48]} justify="center" align="top">
      <Col xs={24}>
        <Space direction="vertical" size="middle" align="center" style={{ width: '100%' }}>
          
          <Image
            src="/logo.png"
            alt="Logo Invernaderos UTEQ"
            preview={false}
            style={{
              height: logoHeight, 
              width: 'auto', 
              borderRadius: '8px', 
            }}
          />

          <div style={{ textAlign: 'center' }}>
            <Title level={4} style={columnTitleStyle}>
              Síguenos
            </Title>
            <Space size="large">
              <Link href="https://www.facebook.com/InfoUTE" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined style={iconStyle} />
              </Link>
              <Link href="https://www.instagram.com/uteq_oficial/?__pwa=1" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined style={iconStyle} />
              </Link>
              <Link href="https://www.linkedin.com/school/uteq/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined style={iconStyle} />
              </Link>
            </Space>
          </div>
        </Space>
      </Col>
    </Row>
  );
};