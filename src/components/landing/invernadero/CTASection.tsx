import React from 'react';
import { Card, Typography, Button, Row, Col, Grid, Flex } from 'antd';
import { ExperimentOutlined, RocketOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid; 

export const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true }); 
  
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleContactRedirect = () => {
    navigate('/login'); 
  };

  const styles = {
    section: {
      padding: screens.xs ? '60px 16px' : screens.sm ? '80px 24px' : screens.lg ? '120px 32px' : '140px 40px',
      background: `linear-gradient(135deg, ${hexToRgba(theme.secondaryDark, 0.15)} 0%, ${hexToRgba(theme.primary, 0.95)} 50%, ${hexToRgba(theme.primaryDark, 0.9)} 100%)`,
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
        radial-gradient(circle at 80% 20%, ${hexToRgba(theme.accent, 0.15)} 0%, transparent 50%),
        radial-gradient(circle at 20% 80%, ${hexToRgba(theme.secondary, 0.15)} 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, ${hexToRgba(theme.textLight, 0.08)} 0%, transparent 60%)
      `,
      zIndex: 0
    } as React.CSSProperties,

    contentWrapper: {
      position: 'relative', 
      zIndex: 1,
      maxWidth: '1200px',
      margin: '0 auto'
    } as React.CSSProperties,

    card: (isVisible: boolean): React.CSSProperties => ({
      background: `linear-gradient(145deg, ${hexToRgba(theme.primary, 0.95)}, ${hexToRgba(theme.primaryDark, 0.98)})`,
      border: `1px solid ${hexToRgba(theme.textLight, 0.15)}`,
      borderRadius: screens.xs ? '20px' : '28px',
      boxShadow: `0 25px 60px ${hexToRgba(theme.primaryDark, 0.4)}, 0 0 0 1px ${hexToRgba(theme.secondary, 0.1)}`,
      textAlign: 'center',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      backdropFilter: 'blur(20px)',
      overflow: 'hidden',
      position: 'relative',
    }),

    cardBody: {
      padding: screens.xs ? '40px 24px' : screens.sm ? '60px 40px' : screens.lg ? '80px 60px' : '100px 80px',
      position: 'relative',
      zIndex: 1,
    } as React.CSSProperties,

    iconWrapper: (): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: screens.xs ? '80px' : screens.sm ? '100px' : '120px',
      height: screens.xs ? '80px' : screens.sm ? '100px' : '120px',
      borderRadius: screens.xs ? '20px' : '24px',
      background: `linear-gradient(135deg, ${theme.accent}, ${hexToRgba(theme.accent, 0.8)})`,
      marginBottom: screens.xs ? '24px' : '32px',
      fontSize: screens.xs ? '32px' : screens.sm ? '40px' : '48px',
      color: theme.primaryDark,
      boxShadow: `0 15px 35px ${hexToRgba(theme.accent, 0.4)}`,
      animation: 'pulseIcon 3s ease-in-out infinite',
    }),

    title: (): React.CSSProperties => ({
      color: theme.text,
      marginBottom: screens.xs ? '16px' : '24px',
      fontSize: screens.xs ? '1.75rem' : screens.sm ? '2.25rem' : screens.lg ? '2.75rem' : '3.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }),

    subtitle: (): React.CSSProperties => ({
      fontSize: screens.xs ? '16px' : screens.sm ? '18px' : screens.lg ? '20px' : '22px',
      color: theme.textLight,
      lineHeight: 1.6,
      marginBottom: screens.xs ? '24px' : '32px',
      maxWidth: '800px',
      margin: '0 auto',
      fontWeight: 400,
    }),

    buttonGroup: (isVisible: boolean): React.CSSProperties => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
      display: 'flex',
      gap: screens.xs ? '16px' : '24px',
      flexDirection: screens.xs ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: screens.xs ? '100%' : 'auto',
    }),

    primaryButton: {
      background: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
      border: 'none',
      borderRadius: screens.xs ? '12px' : '16px',
      fontWeight: 600,
      boxShadow: `0 8px 25px ${hexToRgba(theme.secondary, 0.4)}`,
      height: screens.xs ? '52px' : '60px',
      fontSize: screens.xs ? '16px' : '18px',
      padding: screens.xs ? '0 24px' : '0 40px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    } as React.CSSProperties,

    secondaryButton: {
      color: theme.accent,
      borderColor: theme.accent,
      borderRadius: screens.xs ? '12px' : '16px',
      fontWeight: 600,
      background: 'transparent',
      height: screens.xs ? '52px' : '60px',
      fontSize: screens.xs ? '16px' : '18px',
      padding: screens.xs ? '0 24px' : '0 40px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    } as React.CSSProperties,

    decorativeElements: {
      position: 'absolute',
      top: '10%',
      right: '5%',
      width: screens.xs ? '60px' : '100px',
      height: screens.xs ? '60px' : '100px',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${hexToRgba(theme.secondary, 0.2)} 0%, transparent 70%)`,
      zIndex: 0,
    } as React.CSSProperties,

    decorativeElements2: {
      position: 'absolute',
      bottom: '10%',
      left: '5%',
      width: screens.xs ? '40px' : '80px',
      height: screens.xs ? '40px' : '80px',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${hexToRgba(theme.accent, 0.2)} 0%, transparent 70%)`,
      zIndex: 0,
    } as React.CSSProperties,
  };

  return (
    <section ref={ref} style={styles.section}>
      <div style={styles.backgroundGlow}></div>
      <div style={styles.decorativeElements} />
      <div style={styles.decorativeElements2} />

      <style>
        {`
          @keyframes pulseIcon {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              box-shadow: 0 15px 35px ${hexToRgba(theme.accent, 0.4)};
            }
            50% { 
              transform: scale(1.05) rotate(5deg);
              box-shadow: 0 20px 45px ${hexToRgba(theme.accent, 0.6)};
            }
          }

          .cta-card {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                        box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .cta-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 35px 80px ${hexToRgba(theme.primaryDark, 0.5)};
          }

          .cta-button-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px ${hexToRgba(theme.secondary, 0.6)};
          }

          .cta-button-secondary:hover {
            transform: translateY(-2px);
            background: ${hexToRgba(theme.accent, 0.1)};
          }

          @media (max-width: 768px) {
            .cta-card:hover {
              transform: translateY(-4px);
            }
          }
        `}
      </style>

      <div style={styles.contentWrapper}>
        <Row justify="center">
          <Col xs={24} lg={20} xl={18}>
            <Card 
              className="cta-card"
              style={styles.card(isVisible)}
              bodyStyle={styles.cardBody}
            >
              <Flex vertical align="center">
                <div style={styles.iconWrapper()}>
                  <ExperimentOutlined />
                </div>
                
                <Title level={1} style={styles.title()}>
                  ¿Listo para Transformar tu Agricultura?
                </Title>
                
                <Paragraph style={styles.subtitle()}>
                  Únete a la revolución de la agricultura 4.0. Nuestro sistema de control climático inteligente 
                  no solo maximiza tu productividad y reduce costos, sino que también garantiza la sostenibilidad 
                  y calidad de tus cultivos mediante tecnología de vanguardia.
                </Paragraph>
                
                <div style={styles.buttonGroup(isVisible)}>
                  <Button 
                    type="primary"
                    size="large"
                    icon={<RocketOutlined />}
                    onClick={handleLoginRedirect}
                    className="cta-button-primary"
                    style={styles.primaryButton}
                  >
                    Solicitar Demo Gratuita
                  </Button>
                  
                  <Button 
                    size="large"
                    icon={<MessageOutlined />}
                    onClick={handleContactRedirect}
                    className="cta-button-secondary"
                    style={styles.secondaryButton}
                  >
                    Consultar con Especialista
                  </Button>
                </div>

                <div style={{
                  marginTop: screens.xs ? '24px' : '32px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
                }}>
                  <Paragraph style={{
                    color: theme.textLight,
                    fontSize: screens.xs ? '14px' : '16px',
                    margin: 0,
                    fontStyle: 'italic',
                  }}>
                    ✅ Implementación garantizada • Soporte 24/7 • Resultados en 30 días
                  </Paragraph>
                </div>
              </Flex>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};