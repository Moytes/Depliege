import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { 
  ControlOutlined,
  DashboardOutlined,
  AlertOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation';

const { Title, Paragraph } = Typography;

export const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

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

  return (
    <section ref={ref} style={{
      padding: '80px 20px',
      background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 70% 30%, ${hexToRgba(theme.secondary, 0.05)} 0%, transparent 50%),
          radial-gradient(circle at 30% 70%, ${hexToRgba(theme.accent, 0.05)} 0%, transparent 50%)
        `,
        zIndex: 0
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Row justify="center">
          <Col xs={24} lg={18}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ color: theme.text, marginBottom: '16px' }}>
                Características del Sistema
              </Title>
              <Paragraph style={{ color: theme.textLight, fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                Nuestra plataforma integra las últimas tecnologías para ofrecer un control completo 
                y automatizado de todos los aspectos del ambiente de invernadero.
              </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
              {features.map((feature, index) => (
                <Col xs={24} md={12} key={index}>
                  <Card
                    style={{
                      background: hexToRgba(theme.primaryDark, 0.7),
                      border: `1px solid ${hexToRgba(feature.color, 0.3)}`,
                      borderRadius: '12px',
                      height: '100%',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
                      boxShadow: `0 4px 12px ${hexToRgba(feature.color, 0.2)}`
                    }}
                    bodyStyle={{ padding: '24px' }}
                  >
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: hexToRgba(feature.color, 0.1),
                      border: `1px solid ${hexToRgba(feature.color, 0.3)}`,
                      marginBottom: '16px',
                      fontSize: '24px',
                      color: feature.color
                    }}>
                      {feature.icon}
                    </div>
                    <Title level={4} style={{ color: theme.text, marginBottom: '12px' }}>
                      {feature.title}
                    </Title>
                    <Paragraph style={{ color: theme.textLight, margin: 0 }}>
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