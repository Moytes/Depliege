import React from 'react';
import { Card, Typography, Button, Row, Col, Space, Progress, Grid } from 'antd';
import { 
  RocketOutlined, 
  EnvironmentOutlined, 
  ExperimentOutlined, 
  ControlOutlined,
  AlertOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid; 

export const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  
  const screens = useBreakpoint(); 
  const isMobile = !screens.md;
  
  const navigate = useNavigate();

  const easeOutExpo = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const fastEaseOut = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <section ref={ref} style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 50%, ${theme.primaryDark} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, ${hexToRgba(theme.secondary, 0.05)} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${hexToRgba(theme.secondary, 0.05)} 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, ${hexToRgba(theme.secondary, 0.1)} 0%, transparent 50%)
        `,
        zIndex: 0
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(${hexToRgba(theme.secondary, 0.08)} 1px, transparent 1px),
          linear-gradient(90deg, ${hexToRgba(theme.secondary, 0.08)} 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite',
        zIndex: 0
      }}></div>

      <style>
        {`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes floatRocket {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-12px) rotate(1.5deg) translateX(4px);
            }
          }

          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px ${hexToRgba(theme.secondary, 0.3)}; }
            50% { box-shadow: 0 0 30px ${hexToRgba(theme.secondary, 0.6)}; }
          }
        `}
      </style>
      <div style={{ 
            position: 'relative', 
            zIndex: 1, 
            width: '100%', 
            padding: '20px' 
          }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <div style={{
              textAlign: 'center',
              padding: '20px 0',
              borderBottom: `2px solid ${hexToRgba(theme.secondary, 0.3)}`,
              marginBottom: isMobile ? '20px' : '40px', 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
              transition: `all 0.8s ${easeOutExpo} 0.2s`
            }}>
              <Title 
                level={1} 
                style={{ 
                  color: theme.text,
                  fontSize: isMobile ? '2.5rem' : '3.5rem', 
                  fontWeight: 'bold',
                  textShadow: `0 0 10px ${hexToRgba(theme.secondary, 0.7)}`,
                  marginBottom: '10px',
                }}
              >
                INVERNADEROS <span style={{ color: theme.secondary }}>UTEQ</span>
              </Title>
              <Paragraph style={{ 
                fontSize: isMobile ? '1rem' : '1.2rem', 
                color: theme.textLight,
              }}>
                Sistema Inteligente de Control Climático y Monitoreo
              </Paragraph>
            </div>
          </Col>
        </Row>


        <Row justify="center" style={{ 
          marginTop: '0px'
        }}>
          <Col xs={24} lg={16}>
            <Card 
              style={{ 
                background: hexToRgba(theme.primaryDark, 0.85),
                border: `1px solid ${hexToRgba(theme.secondary, 0.4)}`,
                borderRadius: '12px',
                boxShadow: `0 0 30px ${hexToRgba(theme.secondary, 0.3)}, inset 0 0 20px ${hexToRgba(theme.secondary, 0.1)}`,
                backdropFilter: 'blur(10px)',
                overflow: 'hidden',
                animation: 'pulseGlow 3s ease-in-out infinite'
              }}
              bodyStyle={{ padding: isMobile ? '24px' : '40px' }}
            >
              <Row gutter={[32, 32]} align="middle">
                <Col xs={24} md={12} style={{ overflow: 'hidden' }}>
                  <div style={{ 
                    textAlign: isMobile ? 'center' : 'left',
                  }}>
                    <div style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                      transition: `all 0.8s ${easeOutExpo} 0.5s`,
                      margin: isMobile ? '0 auto' : '0', 
                      width: 'fit-content' 
                    }}>
                      <RocketOutlined style={{ 
                        fontSize: isMobile ? '60px' : '80px', 
                        color: theme.accent,
                        marginBottom: '20px',
                        display: 'block',
                        animation: 'floatRocket 4s ease-in-out infinite', 
                      }} />
                    </div>
                    <Title 
                      level={isMobile ? 3 : 2} 
                      style={{ 
                        color: theme.text, 
                        marginBottom: '16px',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.8s ${easeOutExpo} 0.6s`
                      }}
                    >
                      Control Climático Inteligente
                    </Title>
                    <Paragraph style={{ 
                      fontSize: '16px', 
                      color: theme.textLight,
                      lineHeight: '1.6',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.8s ${easeOutExpo} 0.7s`
                    }}>
                      Sistema automatizado de monitoreo y control ambiental para invernaderos. 
                      Optimiza temperatura, humedad, iluminación y nutrientes en tiempo real 
                      para maximizar el rendimiento de tus cultivos.
                    </Paragraph>
                    <Space 
                      direction={isMobile ? 'vertical' : 'horizontal'}
                      size="middle" 
                      style={{ 
                        marginTop: '24px',
                        width: isMobile ? '100%' : 'auto',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.8s ${easeOutExpo} 0.8s`
                      }}
                    >
                      <Button 
                        type="primary" 
                        size={isMobile ? 'middle' : 'large'} 
                        block={isMobile} 
                        onClick={handleLoginRedirect}
                        style={{
                          background: `linear-gradient(45deg, ${theme.secondaryDark}, ${theme.secondary})`,
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          boxShadow: `0 4px 15px ${hexToRgba(theme.secondary, 0.4)}`,
                        }}
                      >
                        Demo en Vivo
                      </Button>
                      <Button 
                        size={isMobile ? 'middle' : 'large'}
                        block={isMobile}
                        onClick={handleLoginRedirect}
                        style={{
                          color: theme.secondary,
                          borderColor: theme.secondary,
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          background: 'transparent'
                        }}
                      >
                        Ver Documentación
                      </Button>
                    </Space>
                  </div>
                </Col>
                <Col xs={24} md={12} style={{ overflow: 'hidden' }}>
                  <div style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translate(0, 0) scale(1) rotate(0deg)' : 'translate(30px, 20px) scale(0.95) rotate(2deg)',
                    transition: `all 1s ${easeOutExpo} 0.7s`
                  }}>
                    <div style={{
                      background: hexToRgba(theme.primaryDark, 0.7),
                      border: `1px solid ${hexToRgba(theme.secondary, 0.3)}`,
                      borderRadius: '8px',
                      padding: isMobile ? '16px' : '20px'
                    }}>
                      <Title 
                        level={isMobile ? 4 : 3} 
                        style={{ color: theme.secondary, textAlign: 'center', marginBottom: '20px' }}
                      >
                        Monitoreo en Tiempo Real
                      </Title>
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {[
                          { icon: <EnvironmentOutlined />, text: 'Temperatura: 24.5°C', value: 85, delay: '0.8s' },
                          { icon: <ExperimentOutlined />, text: 'Humedad: 65%', value: 65, delay: '0.9s' },
                          { icon: <ControlOutlined />, text: 'CO₂: 420 ppm', value: 70, delay: '1.0s' },
                          { icon: <AlertOutlined />, text: 'Iluminación: 75%', value: 75, delay: '1.1s' }
                        ].map((item, index) => (
                          <div key={index} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            background: hexToRgba(theme.secondary, 0.1),
                            border: `1px solid ${hexToRgba(theme.secondary, 0.2)}`,
                            borderRadius: '6px',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                            transition: `all 0.6s ${fastEaseOut} ${item.delay}`
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ 
                                color: theme.secondary, 
                                fontSize: isMobile ? '18px' : '20px',
                                marginRight: '12px'
                              }}>
                                {item.icon}
                              </span>
                              <span style={{ 
                                color: theme.textLight, 
                                flex: 1,
                                fontSize: isMobile ? '14px' : '16px'
                              }}>
                                {item.text}
                              </span>
                            </div>
                            <Progress 
                              percent={item.value} 
                              showInfo={false}
                              strokeColor={{
                                '0%': theme.secondary,
                                '100%': theme.accent,
                              }}
                            />
                          </div>
                        ))}
                      </Space>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};