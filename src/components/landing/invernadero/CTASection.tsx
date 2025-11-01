import React from 'react';
import { Card, Typography, Button, Row, Col, Space, Grid } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid; 

export const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true }); 
  
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <section ref={ref} style={{
      padding: isMobile ? '50px 20px' : '80px 20px',
      background: `linear-gradient(135deg, ${hexToRgba(theme.secondaryDark, 0.1)} 0%, ${hexToRgba(theme.primary, 0.9)} 100%)`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 80% 20%, ${hexToRgba(theme.accent, 0.1)} 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, ${hexToRgba(theme.secondary, 0.1)} 0%, transparent 50%)
        `,
        zIndex: 0
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Row justify="center">
          <Col xs={24} lg={16}>
            <Card 
              style={{ 
                background: hexToRgba(theme.primaryDark, 0.9),
                border: `1px solid ${hexToRgba(theme.accent, 0.4)}`,
                borderRadius: '16px',
                boxShadow: `0 10px 40px ${hexToRgba(theme.accent, 0.2)}`,
                textAlign: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease'
              }}
              bodyStyle={{ padding: isMobile ? '30px 24px' : '60px 40px' }}
            >
              <ExperimentOutlined style={{ 
                fontSize: isMobile ? '48px' : '64px', 
                color: theme.accent,
                marginBottom: '24px',
                display: 'block'
              }} />
              <Title 
                level={isMobile ? 3 : 2} 
                style={{ color: theme.text, marginBottom: '16px' }}
              >
                ¿Listo para revolucionar tu invernadero?
              </Title>
              <Paragraph style={{ 
                fontSize: isMobile ? '16px' : '18px', 
                color: theme.textLight,
                lineHeight: '1.6',
                marginBottom: '32px',
                maxWidth: '600px',
                margin: '0 auto 32px'
              }}>
                Únete a la nueva era de la agricultura de precisión. Nuestro sistema de control climático 
                automatizado maximizará tu productividad y reducirá tus costos operativos.
              </Paragraph>
              
              <Space 
                direction={isMobile ? 'vertical' : 'horizontal'} 
                size={isMobile ? 'middle' : 'large'}
                style={{ width: isMobile ? '100%' : 'auto' }} 
              >
                <Button 
                  type="primary" 
                  size="large"
                  block={isMobile} 
                  onClick={handleLoginRedirect} 
                  style={{
                    background: `linear-gradient(45deg, ${theme.secondaryDark}, ${theme.secondary})`,
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    padding: '0 32px',
                    height: '48px',
                    fontSize: '16px',
                    boxShadow: `0 4px 15px ${hexToRgba(theme.secondary, 0.4)}`
                  }}
                >
                  Solicitar Demo
                </Button>
                <Button 
                  size="large"
                  block={isMobile} 
                  onClick={handleLoginRedirect}
                  style={{
                    color: theme.accent,
                    borderColor: theme.accent,
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    padding: '0 32px',
                    height: '48px',
                    fontSize: '16px',
                    background: 'transparent'
                  }}
                >
                  Contactar Ventas
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};