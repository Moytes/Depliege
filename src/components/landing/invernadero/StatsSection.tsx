import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Row, Col, Statistic, Grid, Card, Flex } from 'antd'; 
import { ThunderboltOutlined, EyeOutlined, ExperimentOutlined, RiseOutlined } from '@ant-design/icons';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid; 

export const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const screens = useBreakpoint(); 

  const stats = useMemo(() => [
    { 
      value: 95, 
      suffix: '%', 
      label: 'Eficiencia Energética', 
      color: theme.secondary,
      gradient: `linear-gradient(135deg, ${theme.secondary}, ${hexToRgba(theme.secondary, 0.8)})`,
      icon: <ThunderboltOutlined />,
      description: 'Optimización máxima de recursos energéticos'
    },
    { 
      value: 24, 
      suffix: '/7', 
      label: 'Monitoreo Continuo', 
      color: theme.accent,
      gradient: `linear-gradient(135deg, ${theme.accent}, ${hexToRgba(theme.accent, 0.8)})`,
      icon: <EyeOutlined />,
      description: 'Vigilancia ininterrumpida las 24 horas'
    },
    { 
      value: 30, 
      suffix: '%', 
      label: 'Ahorro en Agua', 
      color: theme.secondary,
      gradient: `linear-gradient(135deg, ${theme.secondary}, ${hexToRgba(theme.secondary, 0.8)})`,
      icon: <ExperimentOutlined />,
      description: 'Reducción significativa en consumo hídrico'
    },
    { 
      value: 99, 
      suffix: '%', 
      label: 'Tasa de Éxito', 
      color: theme.accent,
      gradient: `linear-gradient(135deg, ${theme.accent}, ${hexToRgba(theme.accent, 0.8)})`,
      icon: <RiseOutlined />,
      description: 'Cultivos saludables y productivos'
    }
  ], []); 

  useEffect(() => {
    if (isVisible) {
      const intervals = stats.map((stat, index) => {
        let counter = 0;
        const increment = stat.value / 60; 
        const interval = setInterval(() => {
          counter += increment;
          if (counter >= stat.value) {
            counter = stat.value;
            clearInterval(interval);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.round(counter);
            return newCounters;
          });
        }, 20); 
        
        return interval;
      });

      return () => intervals.forEach(interval => clearInterval(interval));
    }
  }, [isVisible, stats]); 

  const styles = {
    section: {
      padding: screens.xs ? '60px 16px' : screens.sm ? '80px 24px' : screens.lg ? '120px 32px' : '140px 40px',
      background: `linear-gradient(180deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`,
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
        radial-gradient(circle at 30% 20%, ${hexToRgba(theme.secondary, 0.08)} 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, ${hexToRgba(theme.accent, 0.08)} 0%, transparent 50%),
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
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
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
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
      lineHeight: 1.6,
      fontWeight: 400,
    }),

    statCard: (isVisible: boolean, gradient: string, index: number): React.CSSProperties => ({
      background: `linear-gradient(145deg, ${hexToRgba(theme.primary, 0.9)}, ${hexToRgba(theme.primaryDark, 0.95)})`,
      border: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
      borderRadius: screens.xs ? '16px' : '20px',
      padding: screens.xs ? '24px 20px' : screens.sm ? '32px 28px' : '40px 32px',
      height: '100%',
      backdropFilter: 'blur(10px)',
      boxShadow: `0 15px 35px ${hexToRgba(theme.primaryDark, 0.3)}`,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      transitionDelay: `${0.4 + index * 0.1}s`,
      overflow: 'hidden',
      position: 'relative',
      textAlign: 'center',
    }),

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

    statValue: (color: string): React.CSSProperties => ({
      color: color, 
      fontSize: screens.xs ? '2rem' : screens.sm ? '2.5rem' : screens.lg ? '3.5rem' : '4rem',
      fontWeight: 'bold',
      marginBottom: '4px',
      lineHeight: 1,
      textShadow: `0 0 20px ${hexToRgba(color, 0.3)}`,
    }),
    
    statLabel: {
      color: theme.text, 
      fontSize: screens.xs ? '1rem' : screens.sm ? '1.1rem' : screens.lg ? '1.25rem' : '1.5rem',
      marginTop: screens.xs ? '8px' : '12px',
      fontWeight: 600,
      lineHeight: 1.3,
    } as React.CSSProperties,

    statDescription: {
      color: theme.textLight, 
      fontSize: screens.xs ? '13px' : screens.sm ? '14px' : '15px',
      marginTop: screens.xs ? '8px' : '12px',
      lineHeight: 1.5,
      opacity: 0.8,
    } as React.CSSProperties,

    statsGrid: {
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
          .stat-card {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                        box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .stat-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 25px 50px ${hexToRgba(theme.primaryDark, 0.4)};
          }

          .stat-card:hover .stat-icon {
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 12px 30px ${hexToRgba(theme.secondary, 0.4)};
          }

          @media (max-width: 768px) {
            .stat-card:hover {
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
                Resultados Comprobados
              </Title>
              <Paragraph style={styles.subtitle(isVisible)}>
                Datos reales que demuestran la efectividad de nuestro sistema inteligente 
                en la optimización de recursos y mejora de la productividad agrícola.
              </Paragraph>
            </div>

            <Row 
              gutter={[
                screens.xs ? 16 : screens.sm ? 24 : 32, 
                screens.xs ? 16 : screens.sm ? 24 : 32
              ]} 
              style={styles.statsGrid}
            >
              {stats.map((stat, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card
                    className="stat-card"
                    style={styles.statCard(isVisible, stat.gradient, index)}
                    bodyStyle={{ padding: 0 }}
                  >
                    <div style={styles.cardGradient(stat.gradient)} />
                    <Flex vertical align="center" style={{ padding: styles.statCard(isVisible, stat.gradient, index).padding }}>
                      <div className="stat-icon" style={styles.iconWrapper(stat.gradient)}>
                        {stat.icon}
                      </div>
                      
                      <Statistic
                        value={counters[index]}
                        suffix={stat.suffix}
                        valueStyle={styles.statValue(stat.color)}
                      />
                      
                      <div style={styles.statLabel}>
                        {stat.label}
                      </div>
                      
                      <div style={styles.statDescription}>
                        {stat.description}
                      </div>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row justify="center" style={{ marginTop: screens.xs ? '40px' : '60px' }}>
              <Col xs={24} md={20} lg={16}>
                <div style={{
                  textAlign: 'center',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s`,
                }}>
                  <Paragraph style={{
                    color: theme.textLight,
                    fontSize: screens.xs ? '14px' : '16px',
                    fontStyle: 'italic',
                    margin: 0,
                  }}>
                    "Basado en datos recopilados de más de 50 invernaderos implementados durante el último año"
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};