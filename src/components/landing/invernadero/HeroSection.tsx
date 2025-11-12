import React from 'react';
import { Card, Typography, Button, Row, Col, Space, Progress, Grid } from 'antd';
import { 
  RocketOutlined, 
  EnvironmentOutlined, 
  ExperimentOutlined, 
  ControlOutlined,
  AlertOutlined,
  PlayCircleOutlined,
  FileTextOutlined
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
      padding: screens.xs ? '40px 16px' : screens.sm ? '60px 24px' : '80px 32px',
    } as React.CSSProperties, 
    
    backgroundGlow: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: `
        radial-gradient(circle at 20% 80%, ${hexToRgba(theme.secondary, 0.08)} 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, ${hexToRgba(theme.accent, 0.08)} 0%, transparent 40%),
        radial-gradient(circle at 40% 40%, ${hexToRgba(theme.textLight, 0.05)} 0%, transparent 50%)
      `,
      zIndex: 0,
    } as React.CSSProperties,

    backgroundGrid: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: `
        linear-gradient(${hexToRgba(theme.secondary, 0.06)} 1px, transparent 1px),
        linear-gradient(90deg, ${hexToRgba(theme.secondary, 0.06)} 1px, transparent 1px)
      `,
      backgroundSize: screens.xs ? '30px 30px' : '50px 50px',
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
      padding: screens.xs ? '20px 0' : '40px 0',
      borderBottom: `2px solid ${hexToRgba(theme.secondary, 0.3)}`,
      marginBottom: screens.xs ? '30px' : screens.md ? '60px' : '80px', 
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
      transition: `all 0.8s ${easeOutExpo} 0.2s`,
    }),

    title: (): React.CSSProperties => ({
      color: theme.text,
      fontSize: screens.xs ? '2rem' : screens.sm ? '2.5rem' : screens.lg ? '3.5rem' : '4rem', 
      fontWeight: 700,
      textShadow: `0 0 20px ${hexToRgba(theme.secondary, 0.5)}`,
      marginBottom: screens.xs ? '8px' : '16px',
      lineHeight: 1.2,
      background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }),

    subtitle: (): React.CSSProperties => ({
      fontSize: screens.xs ? '1rem' : screens.sm ? '1.1rem' : screens.lg ? '1.3rem' : '1.5rem', 
      color: theme.textLight,
      fontWeight: 400,
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.5,
    }),

    card: {
      background: `linear-gradient(145deg, ${hexToRgba(theme.primary, 0.9)}, ${hexToRgba(theme.primaryDark, 0.95)})`,
      border: `1px solid ${hexToRgba(theme.secondary, 0.3)}`,
      borderRadius: screens.xs ? '16px' : '24px',
      boxShadow: `0 20px 60px ${hexToRgba(theme.secondary, 0.2)}, inset 0 1px 0 ${hexToRgba(theme.textLight, 0.1)}`,
      backdropFilter: 'blur(20px)',
      overflow: 'hidden',
      transition: `all 0.4s ${easeOutExpo}`,
    } as React.CSSProperties,

    cardBody: {
      padding: screens.xs ? '24px 20px' : screens.sm ? '32px 28px' : screens.lg ? '48px 40px' : '60px 48px',
    } as React.CSSProperties,

    leftCol: (isVisible: boolean): React.CSSProperties => ({
      textAlign: screens.md ? 'left' : 'center',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.8s ${easeOutExpo} 0.5s`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }),

    rocketIcon: (): React.CSSProperties => ({
      fontSize: screens.xs ? '50px' : screens.sm ? '60px' : screens.lg ? '80px' : '100px', 
      color: theme.accent,
      marginBottom: screens.xs ? '16px' : '24px',
      display: 'block',
      animation: 'floatRocket 4s ease-in-out infinite',
      margin: screens.md ? '0' : '0 auto 20px auto',
      filter: `drop-shadow(0 8px 20px ${hexToRgba(theme.accent, 0.4)})`,
    }),

    infoTitle: (isVisible: boolean): React.CSSProperties => ({
      color: theme.text, 
      marginBottom: screens.xs ? '12px' : '20px',
      fontSize: screens.xs ? '1.5rem' : screens.sm ? '1.75rem' : screens.lg ? '2.25rem' : '2.5rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.8s ${easeOutExpo} 0.6s`,
      fontWeight: 600,
      lineHeight: 1.3,
    }),

    infoParagraph: (isVisible: boolean): React.CSSProperties => ({
      fontSize: screens.xs ? '14px' : screens.sm ? '15px' : '16px', 
      color: theme.textLight,
      lineHeight: screens.xs ? 1.5 : 1.7,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.8s ${easeOutExpo} 0.7s`,
      marginBottom: 0,
    }),

    buttonGroup: (isVisible: boolean): React.CSSProperties => ({
      marginTop: screens.xs ? '20px' : '32px',
      width: screens.md ? 'auto' : '100%',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.8s ${easeOutExpo} 0.8s`,
      display: 'flex',
      gap: screens.xs ? '12px' : '16px',
      flexDirection: screens.xs ? 'column' : 'row',
      justifyContent: screens.md ? 'flex-start' : 'center',
    }),

    rightCol: (isVisible: boolean): React.CSSProperties => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate(0, 0) scale(1) rotate(0deg)' : 'translate(30px, 0px) scale(0.95) rotate(1deg)',
      transition: `all 1s ${easeOutExpo} 0.7s`,
      display: 'flex',
      alignItems: 'center',
    }),

    statsBox: {
      background: `linear-gradient(135deg, ${hexToRgba(theme.primaryDark, 0.8)}, ${hexToRgba(theme.primary, 0.9)})`,
      border: `1px solid ${hexToRgba(theme.secondary, 0.2)}`,
      borderRadius: screens.xs ? '12px' : '16px',
      padding: screens.xs ? '20px 16px' : screens.sm ? '24px 20px' : '32px 24px',
      width: '100%',
      boxShadow: `0 15px 40px ${hexToRgba(theme.primaryDark, 0.3)}`,
    } as React.CSSProperties,

    statsTitle: { 
      color: theme.text, 
      textAlign: 'center', 
      marginBottom: screens.xs ? '16px' : '24px',
      fontSize: screens.xs ? '1.25rem' : screens.sm ? '1.5rem' : '1.75rem',
      fontWeight: 600,
    } as React.CSSProperties,

    statItem: (isVisible: boolean, delay: string): React.CSSProperties => ({
      display: 'flex',
      flexDirection: 'column',
      padding: screens.xs ? '12px 8px' : '16px 12px',
      background: hexToRgba(theme.secondary, 0.05),
      border: `1px solid ${hexToRgba(theme.secondary, 0.15)}`,
      borderRadius: '8px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
      transition: `all 0.6s ${fastEaseOut} ${delay}`,
      marginBottom: screens.xs ? '12px' : '16px',
    }),

    statItemHeader: { 
      display: 'flex', 
      alignItems: 'center', 
      marginBottom: '8px' 
    } as React.CSSProperties,

    statItemIcon: {
      color: theme.secondary, 
      fontSize: screens.xs ? '16px' : screens.sm ? '18px' : '20px',
      marginRight: screens.xs ? '8px' : '12px'
    } as React.CSSProperties,

    statItemText: {
      color: theme.textLight, 
      flex: 1,
      fontSize: screens.xs ? '13px' : screens.sm ? '14px' : '16px',
      fontWeight: 500,
    } as React.CSSProperties,

    primaryButton: {
      background: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
      border: 'none',
      borderRadius: screens.xs ? '8px' : '12px',
      fontWeight: 600,
      boxShadow: `0 8px 25px ${hexToRgba(theme.secondary, 0.4)}`,
      height: screens.xs ? '44px' : '52px',
      fontSize: screens.xs ? '14px' : '16px',
      padding: screens.xs ? '0 20px' : '0 32px',
      transition: 'all 0.3s ease',
    } as React.CSSProperties,

    secondaryButton: {
      color: theme.secondary,
      borderColor: theme.secondary,
      borderRadius: screens.xs ? '8px' : '12px',
      fontWeight: 600,
      background: 'transparent',
      height: screens.xs ? '44px' : '52px',
      fontSize: screens.xs ? '14px' : '16px',
      padding: screens.xs ? '0 20px' : '0 32px',
      transition: 'all 0.3s ease',
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

          .hero-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 30px 80px ${hexToRgba(theme.secondary, 0.3)};
          }

          @media (max-width: 768px) {
            .hero-card:hover {
              transform: translateY(-4px) scale(1.01);
            }
          }
        `}
      </style>
      <div style={styles.contentWrapper}>
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <div style={styles.header(isVisible)}>
              <Title level={1} style={styles.title()}>
                INVERNADEROS <span style={{ color: theme.secondary }}>UTEQ</span>
              </Title>
              <Paragraph style={styles.subtitle()}>
                Sistema Inteligente de Control Climático y Monitoreo en Tiempo Real
              </Paragraph>
            </div>
          </Col>
        </Row>

        <Row justify="center">
          <Col xs={24} lg={22} xl={20} xxl={18}>
            <Card 
              className="hero-card" 
              style={styles.card}
              bodyStyle={styles.cardBody}
            >
              <Row gutter={[screens.xs ? 24 : 48, screens.xs ? 24 : 48]} align="middle">
                <Col xs={24} lg={12}>
                  <div style={styles.leftCol(isVisible)}>
                    <RocketOutlined style={styles.rocketIcon()} />
                    
                    <Title level={2} style={styles.infoTitle(isVisible)}>
                      Control Climático Inteligente
                    </Title>
                    <Paragraph style={styles.infoParagraph(isVisible)}>
                      Sistema automatizado de monitoreo y control ambiental que optimiza 
                      temperatura, humedad, iluminación y nutrientes en tiempo real para 
                      maximizar el rendimiento de tus cultivos con la más avanzada tecnología IoT.
                    </Paragraph>
                    
                    <div style={styles.buttonGroup(isVisible)}>
                      <Button 
                        type="primary" 
                        size="large"
                        icon={<PlayCircleOutlined />}
                        onClick={handleLoginRedirect}
                        style={styles.primaryButton}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 12px 35px ${hexToRgba(theme.secondary, 0.6)}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = `0 8px 25px ${hexToRgba(theme.secondary, 0.4)}`;
                        }}
                      >
                        Demo en Vivo
                      </Button>
                      <Button 
                        size="large"
                        icon={<FileTextOutlined />}
                        onClick={handleLoginRedirect}
                        style={styles.secondaryButton}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.background = hexToRgba(theme.secondary, 0.1);
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        Documentación
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={12}>
                  <div style={styles.rightCol(isVisible)}>
                    <div style={styles.statsBox}>
                      <Title level={3} style={styles.statsTitle}>
                        📊 Monitoreo en Tiempo Real
                      </Title>
                      <Space direction="vertical" size={screens.xs ? 'small' : 'middle'} style={{ width: '100%' }}>
                        {statsList.map((item, index) => (
                          <div key={index} style={styles.statItem(isVisible, item.delay)}>
                            <div style={styles.statItemHeader}>
                              <span style={styles.statItemIcon}>{item.icon}</span>
                              <span style={styles.statItemText}>{item.text}</span>
                            </div>
                            <Progress 
                              percent={item.value} 
                              showInfo={false}
                              strokeColor={{
                                '0%': theme.secondary,
                                '100%': theme.accent,
                              }}
                              trailColor={hexToRgba(theme.textLight, 0.1)}
                              strokeLinecap="round"
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