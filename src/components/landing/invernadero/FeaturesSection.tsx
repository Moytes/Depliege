import React from 'react';
import { Card, Typography, Row, Col, Grid, Flex } from 'antd';
import { ControlOutlined, DashboardOutlined, AlertOutlined, BarChartOutlined, RocketOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const screens = useBreakpoint();
  const easeOutExpo = 'cubic-bezier(0.16, 1, 0.3, 1)';

  const features = [
    {
      icon: <ControlOutlined />,
      title: 'Control Automatizado',
      description: 'Sistema inteligente que ajusta automáticamente los parámetros ambientales según las necesidades específicas de cada cultivo.',
      color: theme.secondary,
      gradient: `linear-gradient(135deg, ${theme.secondary}, ${hexToRgba(theme.secondary, 0.8)})`
    },
    {
      icon: <DashboardOutlined />,
      title: 'Dashboard en Tiempo Real',
      description: 'Interfaz intuitiva que muestra todos los datos relevantes del invernadero con actualizaciones en tiempo real.',
      color: theme.accent,
      gradient: `linear-gradient(135deg, ${theme.accent}, ${hexToRgba(theme.accent, 0.8)})`
    },
    {
      icon: <BarChartOutlined />,
      title: 'Análisis Predictivo',
      description: 'Algoritmos de IA que predicen tendencias y recomiendan ajustes para optimizar el crecimiento de las plantas.',
      color: theme.secondary,
      gradient: `linear-gradient(135deg, ${theme.secondary}, ${hexToRgba(theme.secondary, 0.8)})`
    },
    {
      icon: <AlertOutlined />,
      title: 'Alertas Inteligentes',
      description: 'Sistema de notificaciones que alerta sobre condiciones críticas o fuera de los parámetros establecidos.',
      color: theme.accent,
      gradient: `linear-gradient(135deg, ${theme.accent}, ${hexToRgba(theme.accent, 0.8)})`
    }
  ];

  const styles = {
    section: {
      padding: screens.xs ? '60px 16px' : screens.sm ? '80px 24px' : screens.lg ? '120px 32px' : '140px 40px',
      background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    } as React.CSSProperties,
    
    backgroundGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 70% 30%, ${hexToRgba(theme.secondary, 0.08)} 0%, transparent 50%),
        radial-gradient(circle at 30% 70%, ${hexToRgba(theme.accent, 0.08)} 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, ${hexToRgba(theme.textLight, 0.05)} 0%, transparent 60%)
      `,
      zIndex: 0
    } as React.CSSProperties,

    contentWrapper: { 
      position: 'relative', 
      zIndex: 1, 
      maxWidth: '1400px', 
      margin: '0 auto' 
    } as React.CSSProperties,

    titleWrapper: {
      textAlign: 'center', 
      marginBottom: screens.xs ? '40px' : screens.md ? '60px' : '80px',
      padding: screens.xs ? '0 16px' : '0'
    } as React.CSSProperties,

    title: (isVisible: boolean): React.CSSProperties => ({
      color: theme.text, 
      marginBottom: screens.xs ? '12px' : '20px',
      fontSize: screens.xs ? '1.8rem' : screens.sm ? '2.2rem' : screens.lg ? '2.8rem' : '3.2rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.8s ${easeOutExpo} 0.2s`,
      fontWeight: 700,
      lineHeight: 1.2,
      background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }),

    subtitle: (isVisible: boolean): React.CSSProperties => ({
      color: theme.textLight, 
      fontSize: screens.xs ? '15px' : screens.sm ? '16px' : screens.lg ? '18px' : '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.8s ${easeOutExpo} 0.3s`,
      lineHeight: 1.6,
      fontWeight: 400,
    }),

    card: (isVisible: boolean, gradient: string, index: number): React.CSSProperties => ({
      background: `linear-gradient(145deg, ${hexToRgba(theme.primary, 0.9)}, ${hexToRgba(theme.primaryDark, 0.95)})`,
      border: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
      borderRadius: screens.xs ? '16px' : '20px',
      height: '100%',
      backdropFilter: 'blur(10px)',
      boxShadow: `0 15px 35px ${hexToRgba(theme.primaryDark, 0.3)}`,
      transition: `all 0.4s ${easeOutExpo}`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      transitionDelay: `${0.4 + index * 0.1}s`,
      overflow: 'hidden',
      position: 'relative',
    }),

    cardBody: {
      padding: screens.xs ? '24px 20px' : screens.sm ? '32px 28px' : '40px 32px',
      position: 'relative',
      zIndex: 1,
    } as React.CSSProperties,

    cardGradient: (gradient: string): React.CSSProperties => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: gradient,
      zIndex: 2,
    }),

    iconWrapper: (gradient: string): React.CSSProperties => ({
      display: 'inline-flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: screens.xs ? '50px' : screens.sm ? '60px' : '70px',
      height: screens.xs ? '50px' : screens.sm ? '60px' : '70px',
      borderRadius: screens.xs ? '14px' : '16px',
      background: gradient,
      marginBottom: screens.xs ? '16px' : '24px',
      fontSize: screens.xs ? '20px' : screens.sm ? '24px' : '28px',
      color: theme.primaryDark,
      transition: 'all 0.3s ease-out',
      boxShadow: `0 8px 20px ${hexToRgba(theme.secondary, 0.3)}`,
    }),
    
    cardTitle: {
      color: theme.text, 
      marginBottom: screens.xs ? '8px' : '12px',
      fontSize: screens.xs ? '1.25rem' : screens.sm ? '1.5rem' : screens.lg ? '1.75rem' : '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    } as React.CSSProperties,

    cardDescription: {
      color: theme.textLight, 
      margin: 0,
      fontSize: screens.xs ? '14px' : screens.sm ? '15px' : '16px',
      lineHeight: 1.6,
    } as React.CSSProperties,

    featuresGrid: {
      width: '100%',
    } as React.CSSProperties,
  };

  return (
    <section ref={ref} style={styles.section}>
      <div style={styles.backgroundGlow}></div>
      
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: screens.xs ? '80px' : '150px',
        height: screens.xs ? '80px' : '150px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${hexToRgba(theme.secondary, 0.1)} 0%, transparent 70%)`,
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: screens.xs ? '60px' : '120px',
        height: screens.xs ? '60px' : '120px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${hexToRgba(theme.accent, 0.1)} 0%, transparent 70%)`,
        zIndex: 0,
      }} />

      <style>
        {`
          .feature-card {
            transition: transform 0.4s ${easeOutExpo}, 
                        box-shadow 0.4s ${easeOutExpo},
                        border-color 0.4s ${easeOutExpo};
          }

          .feature-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 25px 50px ${hexToRgba(theme.primaryDark, 0.4)};
            border-color: ${hexToRgba(theme.textLight, 0.2)};
          }

          .feature-card:hover .feature-icon {
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 12px 30px ${hexToRgba(theme.secondary, 0.4)};
          }

          @media (max-width: 768px) {
            .feature-card:hover {
              transform: translateY(-6px);
            }
          }
        `}
      </style>

      <div style={styles.contentWrapper}>
        <Row justify="center">
          <Col xs={24} lg={22} xl={20}>
            <div style={styles.titleWrapper}>
              <Title level={2} style={styles.title(isVisible)}>
                Características Principales
              </Title>
              <Paragraph style={styles.subtitle(isVisible)}>
                Descubre cómo nuestra plataforma integra tecnología de vanguardia para ofrecer 
                un control completo y automatizado de todos los aspectos del ambiente de invernadero, 
                optimizando cada variable para maximizar tu productividad.
              </Paragraph>
            </div>

            <Row 
              gutter={[
                screens.xs ? 16 : screens.sm ? 24 : 32, 
                screens.xs ? 16 : screens.sm ? 24 : 32
              ]} 
              style={styles.featuresGrid}
            >
              {features.map((feature, index) => (
                <Col xs={24} md={12} key={index}>
                  <Card
                    className="feature-card"
                    style={styles.card(isVisible, feature.gradient, index)}
                    bodyStyle={styles.cardBody}
                  >
                    <div style={styles.cardGradient(feature.gradient)} />
                    <Flex 
                      vertical 
                      align={screens.xs ? 'center' : 'flex-start'}
                      style={{ textAlign: screens.xs ? 'center' : 'left' }}
                    >
                      <div className="feature-icon" style={styles.iconWrapper(feature.gradient)}>
                        {feature.icon}
                      </div>
                      <Title level={4} style={styles.cardTitle}>
                        {feature.title}
                      </Title>
                      <Paragraph style={styles.cardDescription}>
                        {feature.description}
                      </Paragraph>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row justify="center" style={{ marginTop: screens.xs ? '40px' : '60px' }}>
              <Col xs={24} md={20} lg={16}>
                <Flex 
                  justify="center" 
                  gap={screens.xs ? 'middle' : 'large'}
                  wrap="wrap"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.8s ${easeOutExpo} 0.8s`,
                  }}
                >
                  <Flex align="center" gap="small">
                    <RocketOutlined style={{ 
                      color: theme.secondary, 
                      fontSize: screens.xs ? '18px' : '20px' 
                    }} />
                    <span style={{ color: theme.textLight, fontWeight: 500 }}>
                      Implementación Rápida
                    </span>
                  </Flex>
                  <Flex align="center" gap="small">
                    <SafetyCertificateOutlined style={{ 
                      color: theme.accent, 
                      fontSize: screens.xs ? '18px' : '20px' 
                    }} />
                    <span style={{ color: theme.textLight, fontWeight: 500 }}>
                      Tecnología Confiable
                    </span>
                  </Flex>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};