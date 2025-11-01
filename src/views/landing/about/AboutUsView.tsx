import React from 'react';
import { Card, Typography, Avatar, Row, Col, Grid, Image } from 'antd';
import { TeamOutlined, RocketOutlined, HeartOutlined } from '@ant-design/icons';

import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme'; 
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation'; 

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const iconColors = {
  mision: {
    background: hexToRgba(theme.secondary, 0.1), 
    color: theme.secondary 
  },
  vision: {

    background: hexToRgba(theme.accent, 0.1),
    color: theme.accent
  },
  valores: {
    background: hexToRgba(theme.textLight, 0.1),
    color: theme.textLight
  }
};

export const AboutUsView: React.FC = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

    const easeOutExpo = 'cubic-bezier(0.16, 1, 0.3, 1)';
    const baseAnimationStyle: React.CSSProperties = {
        opacity: 0,
        transform: 'translateY(30px)',
        transition: `all 0.8s ${easeOutExpo}`
    };
    const visibleAnimationStyle: React.CSSProperties = {
        opacity: 1,
        transform: 'translateY(0)'
    };

    const iconWrapperStyle = (colorSet: { background: string, color: string }): React.CSSProperties => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: colorSet.background,
        color: colorSet.color,
        fontSize: '28px',
        marginBottom: '20px',
    });

    return (
        <section ref={ref} style={{
            width: '100%',
            background: theme.primaryDark, 
            padding: isMobile ? '32px 16px' : '64px 24px',
            overflow: 'hidden'
        }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            
                <Row 
                    gutter={[32, 24]} 
                    align="middle" 
                    style={{ marginBottom: isMobile ? '40px' : '64px' }}
                >
                    <Col xs={24} md={10} style={{ 
                        textAlign: 'center',
                        ...baseAnimationStyle,
                        ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.1s' })
                    }}>
                        <Image 
                            src="/logo.png"
                            alt="Logo Invernaderos UTEQ"
                            preview={false}
                            style={{
                                width: isMobile ? 120 : 180,
                                height: isMobile ? 120 : 180,
                                borderRadius: '16px',
                                objectFit: 'cover',
                                boxShadow: `0 8px 24px ${hexToRgba(theme.primary, 0.5)}`,
                                border: `4px solid ${theme.text}`
                            }}
                        />
                    </Col>
                    <Col xs={24} md={14} style={{ textAlign: isMobile ? 'center' : 'left' }}>
                        <div style={{
                            ...baseAnimationStyle,
                            ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.2s' })
                        }}>
                            <Title level={isMobile ? 2 : 1} style={{ color: theme.text, marginBottom: 16 }}>
                                Sobre Invernaderos UTEQ
                            </Title>
                            <Paragraph style={{ fontSize: '16px', lineHeight: 1.7, color: theme.textLight }}>
                                Somos un equipo de desarrollo apasionado por la tecnología y la agricultura. 
                                Nuestra misión es proveer soluciones innovadoras para la gestión y 
                                monitorización de invernaderos, optimizando recursos y mejorando la producción.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>

                <div style={{
                    ...baseAnimationStyle,
                    ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.3s' })
                }}>
                    <Title level={3} style={{ textAlign: 'center', marginBottom: 40, color: theme.text }}>
                        Nuestros Pilares
                    </Title>
                </div>
                
                <Row gutter={[isMobile ? 16 : 24, isMobile ? 16 : 24]}>
                    <Col xs={24} sm={8} style={{
                        ...baseAnimationStyle,
                        ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.4s' })
                    }}>
                        <div style={{
                            background: theme.primary,
                            padding: '24px',
                            borderRadius: '12px',
                            boxShadow: `0 4px 12px ${hexToRgba(theme.secondary, 0.1)}`,
                            textAlign: 'center',
                            height: '100%'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={iconWrapperStyle(iconColors.mision)}>
                                    <RocketOutlined />
                                </div>
                            </div>
                            <Title level={4} style={{ marginTop: 0, color: theme.text }}>Misión</Title>
                            <Paragraph style={{ color: theme.textLight }}>
                                Proveer soluciones tecnológicas de vanguardia para la agricultura inteligente.
                            </Paragraph>
                        </div>
                    </Col>
                    
                    <Col xs={24} sm={8} style={{
                        ...baseAnimationStyle,
                        ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.5s' })
                    }}>
                        <div style={{
                            background: theme.primary,
                            padding: '24px',
                            borderRadius: '12px',
                            boxShadow: `0 4px 12px ${hexToRgba(theme.accent, 0.1)}`,
                            textAlign: 'center',
                            height: '100%'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={iconWrapperStyle(iconColors.vision)}>
                                    <TeamOutlined />
                                </div>
                            </div>
                            <Title level={4} style={{ marginTop: 0, color: theme.text }}>Visión</Title>
                            <Paragraph style={{ color: theme.textLight }}>
                                Ser la plataforma líder en la gestión de invernaderos en la región, impulsando la sostenibilidad.
                            </Paragraph>
                        </div>
                    </Col>

                    <Col xs={24} sm={8} style={{
                        ...baseAnimationStyle,
                        ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.6s' })
                    }}>
                        <div style={{
                            background: theme.primary,
                            padding: '24px',
                            borderRadius: '12px',
                            boxShadow: `0 4px 12px ${hexToRgba(theme.textLight, 0.1)}`,
                            textAlign: 'center',
                            height: '100%'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={iconWrapperStyle(iconColors.valores)}>
                                    <HeartOutlined />
                                </div>
                            </div>
                            <Title level={4} style={{ marginTop: 0, color: theme.text }}>Valores</Title>
                            <Paragraph style={{ color: theme.textLight }}>
                                Innovación, Compromiso y Sostenibilidad.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};