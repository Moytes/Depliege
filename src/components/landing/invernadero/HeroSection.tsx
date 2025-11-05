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
  const navigate = useNavigate();

  const easeOutExpo = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const fastEaseOut = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const styles = {
    section: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 50%, ${theme.primaryDark} 100%)`,
      position: 'relative',
      overflow: 'hidden',
      padding: screens.xs ? '20px 10px' : '20px',
    } as React.CSSProperties, 
    
    backgroundGlow: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: `
        radial-gradient(circle at 20% 80%, ${hexToRgba(theme.secondary, 0.05)} 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, ${hexToRgba(theme.secondary, 0.05)} 0%, transparent 40%),
        radial-gradient(circle at 40% 40%, ${hexToRgba(theme.secondary, 0.1)} 0%, transparent 50%)
      `,
      zIndex: 0,
    } as React.CSSProperties,
    backgroundGrid: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: `
        linear-gradient(${hexToRgba(theme.secondary, 0.08)} 1px, transparent 1px),
        linear-gradient(90deg, ${hexToRgba(theme.secondary, 0.08)} 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
      animation: 'gridMove 30s linear infinite',
      zIndex: 0,
    } as React.CSSProperties,

    contentWrapper: {
      position: 'relative', 
      zIndex: 1, 
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto'
    } as React.CSSProperties,

    header: (isVisible: boolean): React.CSSProperties => ({
      textAlign: 'center',
      padding: '20px 0',
      borderBottom: `2px solid ${hexToRgba(theme.secondary, 0.3)}`,
      marginBottom: screens.md ? '40px' : '20px', 
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
      transition: `all 0.8s ${easeOutExpo} 0.2s`,
    }),
    title: (): React.CSSProperties => ({
      color: theme.text,
      fontSize: screens.xl ? '3.5rem' : (screens.lg ? '3rem' : (screens.sm ? '2.5rem' : '2.2rem')), 
      fontWeight: 'bold',
      textShadow: `0 0 10px ${hexToRgba(theme.secondary, 0.7)}`,
      marginBottom: '10px',
    }),
    subtitle: (): React.CSSProperties => ({
      fontSize: screens.lg ? '1.2rem' : (screens.sm ? '1.1rem' : '1rem'), 
      color: theme.textLight,
    }),

    card: {
      background: hexToRgba(theme.primaryDark, 0.85),
      border: `1px solid ${hexToRgba(theme.secondary, 0.4)}`,
      borderRadius: '12px',
      boxShadow: `0 0 30px ${hexToRgba(theme.secondary, 0.3)}, inset 0 0 20px ${hexToRgba(theme.secondary, 0.1)}`,
      backdropFilter: 'blur(10px)',
      overflow: 'hidden',
      animation: 'pulseGlow 3s ease-in-out infinite',
      transition: `all 0.3s ${easeOutExpo}`,
    } as React.CSSProperties,
    cardBody: {
      padding: screens.md ? '40px' : (screens.sm ? '32px' : '24px'),
    } as React.CSSProperties,

    leftCol: (isVisible: boolean): React.CSSProperties => ({
      textAlign: screens.md ? 'left' : 'center',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.8s ${easeOutExpo} 0.5s`,
    }),
    rocketIcon: (): React.CSSProperties => ({
      fontSize: screens.md ? '80px' : '60px', 
      color: theme.accent,
      marginBottom: '20px',
      display: 'block',
      animation: 'floatRocket 4s ease-in-out infinite',
      margin: screens.md ? '0' : '0 auto 20px auto',
    }),
    infoTitle: (isVisible: boolean): React.CSSProperties => ({
      color: theme.text, 
      marginBottom: '16px',
      fontSize: screens.lg ? '2rem' : (screens.sm ? '1.75rem' : '1.5rem'),
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.8s ${easeOutExpo} 0.6s`,
    }),
    infoParagraph: (isVisible: boolean): React.CSSProperties => ({
      fontSize: '16px', 
      color: theme.textLight,
      lineHeight: '1.6',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.8s ${easeOutExpo} 0.7s`,
    }),
    buttonGroup: (isVisible: boolean): React.CSSProperties => ({
      marginTop: '24px',
      width: screens.md ? 'auto' : '100%',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.8s ${easeOutExpo} 0.8s`,
    }),

    rightCol: (isVisible: boolean): React.CSSProperties => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate(0, 0) scale(1) rotate(0deg)' : 'translate(30px, 0px) scale(0.95) rotate(1deg)',
      transition: `all 1s ${easeOutExpo} 0.7s`,
    }),
    statsBox: {
      background: hexToRgba(theme.primaryDark, 0.7),
      border: `1px solid ${hexToRgba(theme.secondary, 0.3)}`,
      borderRadius: '8px',
      padding: screens.md ? '20px' : '16px'
    } as React.CSSProperties,
    statsTitle: { 
      color: theme.secondary, 
      textAlign: 'center', 
      marginBottom: '20px',
      fontSize: screens.md ? '1.5rem' : '1.25rem',
    } as React.CSSProperties,
    statItem: (isVisible: boolean, delay: string): React.CSSProperties => ({
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      background: hexToRgba(theme.secondary, 0.1),
      border: `1px solid ${hexToRgba(theme.secondary, 0.2)}`,
      borderRadius: '6px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
      transition: `all 0.6s ${fastEaseOut} ${delay}`,
    }),
    statItemHeader: { 
      display: 'flex', 
      alignItems: 'center', 
      marginBottom: '8px' 
    } as React.CSSProperties,
    statItemIcon: {
      color: theme.secondary, 
      fontSize: screens.md ? '20px' : '18px',
      marginRight: '12px'
    } as React.CSSProperties,
    statItemText: {
      color: theme.textLight, 
      flex: 1,
      fontSize: screens.md ? '16px' : '14px'
    } as React.CSSProperties,
  };
  
  const statsList = [
    { icon: <EnvironmentOutlined />, text: 'Temperatura: 24.5°C', value: 85, delay: '0.9s' },
    { icon: <ExperimentOutlined />, text: 'Humedad: 65%', value: 65, delay: '1.0s' },
    { icon: <ControlOutlined />, text: 'CO₂: 420 ppm', value: 70, delay: '1.1s' },
    { icon: <AlertOutlined />, text: 'Iluminación: 75%', value: 75, delay: '1.2s' }
  ];

  return (
    <section ref={ref} style={styles.section}>
      <div style={styles.backgroundGlow}></div>
      <div style={styles.backgroundGrid}></div>
      <style>
        {`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes floatRocket {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(1.5deg) translateX(4px); }
          }

          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px ${hexToRgba(theme.secondary, 0.3)}; }
            50% { box-shadow: 0 0 30px ${hexToRgba(theme.secondary, 0.6)}; }
          }

          .hero-card:hover {
            transform: translateY(-5px) scale(1.01);
            box-shadow: 0 0 40px ${hexToRgba(theme.secondary, 0.5)};
          }
        `}
      </style>
      <div style={styles.contentWrapper}>
        <Row justify="center">
          <Col xs={24} sm={20} md={18} lg={14}>
            <div style={styles.header(isVisible)}>
              <Title level={1} style={styles.title()}>
                INVERNADEROS <span style={{ color: theme.secondary }}>UTEQ</span>
              </Title>
              <Paragraph style={styles.subtitle()}>
                Sistema Inteligente de Control Climático y Monitoreo
              </Paragraph>
            </div>
          </Col>
        </Row>

        <Row justify="center">
          <Col xs={24} lg={20} xl={18}>
            <Card 
              className="hero-card" 
              style={styles.card}
              bodyStyle={styles.cardBody}
            >
              <Row gutter={[32, 32]} align="middle">
                <Col xs={24} md={12}>
                  <div style={styles.leftCol(isVisible)}>
                    <RocketOutlined style={styles.rocketIcon()} />
                    
                    <Title level={2} style={styles.infoTitle(isVisible)}>
                      Control Climático Inteligente
                    </Title>
                    <Paragraph style={styles.infoParagraph(isVisible)}>
                      Sistema automatizado de monitoreo y control ambiental. 
                      Optimiza temperatura, humedad, iluminación y nutrientes en tiempo real 
                      para maximizar el rendimiento de tus cultivos.
                    </Paragraph>
                    
                    <Space 
                      direction={screens.md ? 'horizontal' : 'vertical'}
                      size="middle" 
                      style={styles.buttonGroup(isVisible)}
                    >
                      <Button 
                        type="primary" 
                        size={screens.md ? 'large' : 'middle'} 
                        block={!screens.md} 
                        onClick={handleLoginRedirect}
                        style={{
                          background: `linear-gradient(45deg, ${theme.secondaryDark}, ${theme.secondary})`,
                          border: 'none', borderRadius: '6px', fontWeight: 'bold',
                          boxShadow: `0 4px 15px ${hexToRgba(theme.secondary, 0.4)}`,
                        }}
                      >
                        Demo en Vivo
                      </Button>
                      <Button 
                        size={screens.md ? 'large' : 'middle'}
                        block={!screens.md}
                        onClick={handleLoginRedirect}
                        style={{
                          color: theme.secondary, borderColor: theme.secondary,
                          borderRadius: '6px', fontWeight: 'bold', background: 'transparent'
                        }}
                      >
                        Ver Documentación
                      </Button>
                    </Space>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div style={styles.rightCol(isVisible)}>
                    <div style={styles.statsBox}>
                      <Title level={3} style={styles.statsTitle}>
                        Monitoreo en Tiempo Real
                      </Title>
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        
                        {statsList.map((item, index) => (
                          <div key={index} style={styles.statItem(isVisible, item.delay)}>
                            <div style={styles.statItemHeader}>
                              <span style={styles.statItemIcon}>{item.icon}</span>
                              <span style={styles.statItemText}>{item.text}</span>
                            </div>
                            <Progress 
                              percent={item.value} 
                              showInfo={false}
                              strokeColor={{ '0%': theme.secondary, '100%': theme.accent }}
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