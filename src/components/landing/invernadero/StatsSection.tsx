import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Row, Col, Statistic, Grid } from 'antd'; 
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid; 

export const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const screens = useBreakpoint(); 

  const stats = useMemo(() => [
    { value: 95, suffix: '%', label: 'Eficiencia Energética', color: theme.secondary },
    { value: 24, suffix: '/7', label: 'Monitoreo Continuo', color: theme.accent },
    { value: 30, suffix: '%', label: 'Ahorro en Agua', color: theme.secondary },
    { value: 99, suffix: '%', label: 'Tasa de Éxito', color: theme.accent }
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
      padding: screens.md ? '80px 40px' : '40px 20px', // Padding responsivo
      background: `linear-gradient(180deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    } as React.CSSProperties,

    backgroundGlow: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: `radial-gradient(circle at 50% 50%, ${hexToRgba(theme.accent, 0.05)} 0%, transparent 50%)`,
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
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
    }),

    subtitle: (isVisible: boolean): React.CSSProperties => ({
      color: theme.textLight, 
      fontSize: screens.md ? '16px' : '15px', 
      maxWidth: '600px', 
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
    }),

    statItem: (isVisible: boolean, index: number): React.CSSProperties => ({
      textAlign: 'center',
      background: hexToRgba(theme.primaryDark, 0.4),
      padding: screens.md ? '24px' : '16px',
      borderRadius: '8px',
      border: `1px solid ${hexToRgba(theme.secondary, 0.2)}`,
      height: '100%',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.15}s`
    }),

    statValue: (color: string): React.CSSProperties => ({
      color: color, 
      fontSize: screens.lg ? '3rem' : (screens.md ? '2.5rem' : '2.2rem'),
      fontWeight: 'bold',
      marginBottom: '4px' 
    }),
    
    statLabel: {
      color: theme.textLight, 
      fontSize: screens.md ? '1.1rem' : '1rem',
      marginTop: '8px'
    } as React.CSSProperties
  };

  return (
    <section ref={ref} style={styles.section}>
      <div style={styles.backgroundGlow}></div>

      <div style={styles.contentWrapper}>
        <Row justify="center">
          <Col xs={24} lg={18}>
            <div style={styles.titleWrapper}>
              <Title level={2} style={styles.title(isVisible)}>
                Resultados Comprobados
              </Title>
              <Paragraph style={styles.subtitle(isVisible)}>
                Nuestro sistema ha demostrado mejoras significativas en la productividad y eficiencia de invernaderos.
              </Paragraph>
            </div>

            <Row gutter={[screens.md ? 32 : 24, screens.md ? 32 : 24]}>
              {stats.map((stat, index) => (
                <Col xs={12} md={6} key={index}>
                  <div style={styles.statItem(isVisible, index)}>
                    <Statistic
                      value={counters[index]}
                      suffix={stat.suffix}
                      valueStyle={styles.statValue(stat.color)}
                    />
                    <div style={styles.statLabel}>
                      {stat.label}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};