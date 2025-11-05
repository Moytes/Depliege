import React from 'react';
import { Card, Typography, Row, Col, Grid } from 'antd';
import { ControlOutlined,DashboardOutlined,AlertOutlined,BarChartOutlined } from '@ant-design/icons';
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
      color: theme.secondary
    },
    {
      icon: <DashboardOutlined />,
      title: 'Dashboard en Tiempo Real',
      description: 'Interfaz intuitiva que muestra todos los datos relevantes del invernadero con actualizaciones en tiempo real.',
      color: theme.accent
    },
    {
      icon: <BarChartOutlined />,
      title: 'Análisis Predictivo',
      description: 'Algoritmos de IA que predicen tendencias y recomiendan ajustes para optimizar el crecimiento de las plantas.',
      color: theme.secondary
    },
    {
      icon: <AlertOutlined />,
      title: 'Alertas Inteligentes',
      description: 'Sistema de notificaciones que alerta sobre condiciones críticas o fuera de los parámetros establecidos.',
      color: theme.accent
    }
  ];

  const styles = {
    section: {
      padding: screens.md ? '80px 40px' : '40px 20px', 
      background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    } as React.CSSProperties,
    
    backgroundGlow: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: `
        radial-gradient(circle at 70% 30%, ${hexToRgba(theme.secondary, 0.05)} 0%, transparent 50%),
        radial-gradient(circle at 30% 70%, ${hexToRgba(theme.accent, 0.05)} 0%, transparent 50%)
      `,
      zIndex: 0
    } as React.CSSProperties,

    contentWrapper: { 
      position: 'relative', 
      zIndex: 1, 
      maxWidth: '1200px', 
      margin: '0 auto' 
    } as React.CSSProperties,

    titleWrapper: {
      textAlign: 'center', 
      marginBottom: screens.md ? '60px' : '40px' 
    } as React.CSSProperties,

    title: (isVisible: boolean): React.CSSProperties => ({
      color: theme.text, 
      marginBottom: '16px',
      fontSize: screens.lg ? '2.5rem' : (screens.md ? '2.2rem' : '2rem'), 
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s ${easeOutExpo} 0.2s` 
    }),

    subtitle: (isVisible: boolean): React.CSSProperties => ({
      color: theme.textLight, 
      fontSize: screens.md ? '16px' : '15px', 
      maxWidth: '600px', 
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s ${easeOutExpo} 0.3s` 
    }),

    card: (isVisible: boolean, color: string, index: number): React.CSSProperties => ({
      background: hexToRgba(theme.primaryDark, 0.7),
      border: `1px solid ${hexToRgba(color, 0.3)}`,
      borderRadius: '12px',
      height: '100%',
      backdropFilter: 'blur(5px)', 
      boxShadow: `0 4px 12px ${hexToRgba(color, 0.2)}`,
      transition: `all 0.4s ${easeOutExpo}`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transitionDelay: `${0.4 + index * 0.15}s`, 
    }),

    cardBody: {
      padding: screens.md ? '32px' : '24px' 
    } as React.CSSProperties,

    iconWrapper: (color: string): React.CSSProperties => ({
      display: 'inline-flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: hexToRgba(color, 0.1),
      border: `1px solid ${hexToRgba(color, 0.3)}`,
      marginBottom: '20px',
      fontSize: '24px',
      color: color,
      transition: 'all 0.3s ease-out' 
    }),
    
    cardTitle: {
      color: theme.text, 
      marginBottom: '12px',
      fontSize: screens.md ? '1.5rem' : '1.25rem' 
    } as React.CSSProperties,

    cardDescription: {
      color: theme.textLight, 
      margin: 0,
      fontSize: screens.md ? '16px' : '15px' 
    } as React.CSSProperties,
  };

  return (
    <section ref={ref} style={styles.section}>
      <div style={styles.backgroundGlow}></div>
      <style>
        {`
          .feature-card {
            /* Definimos la transición aquí para que aplique en ambas direcciones */
            transition: transform 0.3s ${easeOutExpo}, 
                        border-color 0.3s ${easeOutExpo}, 
                        box-shadow 0.3s ${easeOutExpo};
          }

          .feature-card:hover {
            transform: translateY(-5px);
            border-color: ${hexToRgba(theme.text, 0.7)};
            box-shadow: 0 8px 25px ${hexToRgba(theme.primaryDark, 0.5)};
          }

          .feature-card:hover .feature-icon {
            transform: scale(1.1);
          }
        `}
      </style>

      <div style={styles.contentWrapper}>
        <Row justify="center">
          <Col xs={24} lg={18}>
            <div style={styles.titleWrapper}>
              <Title level={2} style={styles.title(isVisible)}>
                Características del Sistema
              </Title>
              <Paragraph style={styles.subtitle(isVisible)}>
                Nuestra plataforma integra las últimas tecnologías para ofrecer un control completo 
                y automatizado de todos los aspectos del ambiente de invernadero.
              </Paragraph>
            </div>

            <Row gutter={[screens.md ? 32 : 24, screens.md ? 32 : 24]}>
              {features.map((feature, index) => (
                <Col xs={24} md={12} key={index}>
                  <Card
                    className="feature-card" 
                    style={styles.card(isVisible, feature.color, index)}
                    bodyStyle={styles.cardBody}
                  >
                    <div className="feature-icon" style={styles.iconWrapper(feature.color)}>
                      {feature.icon}
                    </div>
                    <Title level={4} style={styles.cardTitle}>
                      {feature.title}
                    </Title>
                    <Paragraph style={styles.cardDescription}>
                      {feature.description}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};