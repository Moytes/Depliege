import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Statistic } from 'antd';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation';

const { Title, Paragraph } = Typography;

export const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  
  const stats = [
    { value: 95, suffix: '%', label: 'Eficiencia Energética' },
    { value: 24, suffix: '/7', label: 'Monitoreo Continuo' },
    { value: 30, suffix: '%', label: 'Ahorro en Agua' },
    { value: 99, suffix: '%', label: 'Tasa de Éxito' }
  ];

  useEffect(() => {
    if (isVisible) {
      const intervals = stats.map((stat, index) => {
        let counter = 0;
        const increment = stat.value / 50; 
        const interval = setInterval(() => {
          counter += increment;
          if (counter >= stat.value) {
            counter = stat.value;
            clearInterval(interval);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(counter);
            return newCounters;
          });
        }, 30);
        
        return interval;
      });

      return () => intervals.forEach(interval => clearInterval(interval));
    }
  }, [isVisible, stats]); 

  return (
    <section ref={ref} style={{
      padding: '80px 20px',
      background: `linear-gradient(180deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 50% 50%, ${hexToRgba(theme.accent, 0.05)} 0%, transparent 50%)
        `,
        zIndex: 0
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Row justify="center">
          <Col xs={24} lg={18}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ color: theme.text, marginBottom: '16px' }}>
                Resultados Comprobados
              </Title>
              <Paragraph style={{ color: theme.textLight, fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                Nuestro sistema ha demostrado mejoras significativas en la productividad y eficiencia de invernaderos.
              </Paragraph>
            </div>

            <Row gutter={[32, 32]}>
              {stats.map((stat, index) => (
                <Col xs={12} md={6} key={index}>
                  <div style={{ 
                    textAlign: 'center',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
                  }}>
                    <Statistic
                      value={counters[index]}
                      suffix={stat.suffix}
                      valueStyle={{ 
                        color: theme.secondary, 
                        fontSize: '3rem',
                        fontWeight: 'bold'
                      }}
                    />
                    <div style={{ 
                      color: theme.textLight, 
                      fontSize: '1.1rem',
                      marginTop: '8px'
                    }}>
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