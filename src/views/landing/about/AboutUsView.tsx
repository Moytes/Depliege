import React from 'react';
import { Typography, Row, Col, Grid, Image, Card, Flex } from 'antd';
import { TeamOutlined, RocketOutlined, HeartOutlined, BulbOutlined, GlobalOutlined, CrownOutlined } from '@ant-design/icons';

import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme'; 
import { useScrollAnimation } from '../../../hook/landing/invernadero/Hero/useScrollAnimation'; 

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const iconColors = {
    mision: {
        background: `linear-gradient(135deg, ${theme.secondary}, ${hexToRgba(theme.secondary, 0.8)})`,
        color: theme.primaryDark
    },
    vision: {
        background: `linear-gradient(135deg, ${theme.accent}, ${hexToRgba(theme.accent, 0.8)})`,
        color: theme.primaryDark
    },
    valores: {
        background: `linear-gradient(135deg, ${theme.textLight}, ${hexToRgba(theme.textLight, 0.8)})`,
        color: theme.primaryDark
    }
};

export const AboutUsView: React.FC = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

    const easeOutExpo = 'cubic-bezier(0.16, 1, 0.3, 1)';
    const baseAnimationStyle: React.CSSProperties = {
        opacity: 0,
        transform: 'translateY(40px)',
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
        width: isMobile ? 50 : 70,
        height: isMobile ? 50 : 70,
        borderRadius: '20px',
        background: colorSet.background,
        color: colorSet.color,
        fontSize: isMobile ? '22px' : '28px',
        marginBottom: '20px',
        boxShadow: `0 8px 20px ${hexToRgba(colorSet.color, 0.3)}`,
    });

    const cardStyle: React.CSSProperties = {
        background: `linear-gradient(145deg, ${theme.primary}, ${hexToRgba(theme.primaryDark, 0.8)})`,
        padding: isMobile ? '20px' : '32px',
        borderRadius: '20px',
        border: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
        boxShadow: `0 15px 35px ${hexToRgba(theme.primaryDark, 0.3)}`,
        textAlign: 'center',
        height: '100%',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
    };

    return (
        <section ref={ref} style={{
            width: '100%',
            background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`,
            padding: isMobile ? '40px 16px' : '80px 24px',
            overflow: 'hidden',
            position: 'relative',
        }}>
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: isMobile ? '100px' : '200px',
                height: isMobile ? '100px' : '200px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${hexToRgba(theme.secondary, 0.1)} 0%, transparent 70%)`,
                zIndex: 0,
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: isMobile ? '80px' : '150px',
                height: isMobile ? '80px' : '150px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${hexToRgba(theme.accent, 0.1)} 0%, transparent 70%)`,
                zIndex: 0,
            }} />

            <div style={{ 
                maxWidth: 1200, 
                margin: '0 auto', 
                position: 'relative', 
                zIndex: 1 
            }}>
                <Row 
                    gutter={[isMobile ? 24 : 48, isMobile ? 24 : 48]} 
                    align="middle" 
                    style={{ marginBottom: isMobile ? '48px' : '80px' }}
                >
                    <Col xs={24} md={10} style={{ 
                        textAlign: 'center',
                        ...baseAnimationStyle,
                        ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.1s' })
                    }}>
                        <div style={{
                            background: `linear-gradient(145deg, ${theme.primary}, ${hexToRgba(theme.primaryDark, 0.9)})`,
                            padding: isMobile ? '20px' : '30px',
                            borderRadius: '24px',
                            border: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
                            boxShadow: `0 20px 40px ${hexToRgba(theme.primaryDark, 0.4)}`,
                            display: 'inline-block',
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
                                }}
                            />
                        </div>
                    </Col>
                    
                    <Col xs={24} md={14}>
                        <div style={{
                            ...baseAnimationStyle,
                            ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.2s' })
                        }}>
                            <Title 
                                level={isMobile ? 2 : 1} 
                                style={{ 
                                    color: theme.text, 
                                    marginBottom: 16,
                                    textAlign: isMobile ? 'center' : 'left',
                                    background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 700,
                                }}
                            >
                                Innovación en Agricultura Digital
                            </Title>
                            <Paragraph style={{ 
                                fontSize: isMobile ? '15px' : '18px', 
                                lineHeight: 1.7, 
                                color: theme.textLight,
                                textAlign: isMobile ? 'center' : 'left',
                                marginBottom: '24px'
                            }}>
                                En <strong style={{ color: theme.secondary }}>Invernaderos UTEQ</strong>, fusionamos 
                                tecnología de vanguardia con expertise agrícola para revolucionar 
                                la gestión de cultivos protegidos.
                            </Paragraph>
                            <Flex 
                                gap="middle" 
                                justify={isMobile ? 'center' : 'flex-start'}
                                wrap="wrap"
                            >
                                <Flex align="center" gap="small">
                                    <BulbOutlined style={{ color: theme.secondary, fontSize: '20px' }} />
                                    <span style={{ color: theme.textLight, fontWeight: 500 }}>Tecnología IoT</span>
                                </Flex>
                                <Flex align="center" gap="small">
                                    <CrownOutlined style={{ color: theme.accent, fontSize: '20px' }} />
                                    <span style={{ color: theme.textLight, fontWeight: 500 }}>Precisión</span>
                                </Flex>
                                <Flex align="center" gap="small">
                                    <GlobalOutlined style={{ color: theme.textLight, fontSize: '20px' }} />
                                    <span style={{ color: theme.textLight, fontWeight: 500 }}>Sostenibilidad</span>
                                </Flex>
                            </Flex>
                        </div>
                    </Col>
                </Row>

                <div style={{
                    ...baseAnimationStyle,
                    ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.3s' })
                }}>
                    <Title 
                        level={2} 
                        style={{ 
                            textAlign: 'center', 
                            marginBottom: isMobile ? 32 : 48, 
                            color: theme.text,
                            background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Nuestros Pilares Fundamentales
                    </Title>
                </div>
                
                <Row gutter={[isMobile ? 16 : 24, isMobile ? 16 : 24]}>
                    <Col xs={24} sm={8} style={{
                        ...baseAnimationStyle,
                        ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.4s' })
                    }}>
                        <Card 
                            bodyStyle={{ padding: 0 }}
                            style={{
                                ...cardStyle,
                                borderTop: `4px solid ${theme.secondary}`
                            }}
                            hoverable
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = `0 25px 50px ${hexToRgba(theme.secondary, 0.2)}`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = `0 15px 35px ${hexToRgba(theme.primaryDark, 0.3)}`;
                            }}
                        >
                            <div style={{ padding: isMobile ? '20px' : '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={iconWrapperStyle(iconColors.mision)}>
                                        <RocketOutlined />
                                    </div>
                                </div>
                                <Title level={4} style={{ marginTop: 0, color: theme.text, marginBottom: '16px' }}>
                                    Misión
                                </Title>
                                <Paragraph style={{ 
                                    color: theme.textLight, 
                                    fontSize: isMobile ? '14px' : '16px',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>
                                    Desarrollar soluciones tecnológicas innovadoras que optimicen 
                                    la producción agrícola mediante sistemas inteligentes de 
                                    monitorización y control en tiempo real.
                                </Paragraph>
                            </div>
                        </Card>
                    </Col>
                    
                    <Col xs={24} sm={8} style={{
                        ...baseAnimationStyle,
                        ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.5s' })
                    }}>
                        <Card 
                            bodyStyle={{ padding: 0 }}
                            style={{
                                ...cardStyle,
                                borderTop: `4px solid ${theme.accent}`
                            }}
                            hoverable
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = `0 25px 50px ${hexToRgba(theme.accent, 0.2)}`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = `0 15px 35px ${hexToRgba(theme.primaryDark, 0.3)}`;
                            }}
                        >
                            <div style={{ padding: isMobile ? '20px' : '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={iconWrapperStyle(iconColors.vision)}>
                                        <TeamOutlined />
                                    </div>
                                </div>
                                <Title level={4} style={{ marginTop: 0, color: theme.text, marginBottom: '16px' }}>
                                    Visión
                                </Title>
                                <Paragraph style={{ 
                                    color: theme.textLight, 
                                    fontSize: isMobile ? '14px' : '16px',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>
                                    Liderar la transformación digital del sector agrícola, 
                                    estableciendo nuevos estándares de eficiencia, sostenibilidad 
                                    y productividad en la gestión de invernaderos.
                                </Paragraph>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={8} style={{
                        ...baseAnimationStyle,
                        ...(isVisible && { ...visibleAnimationStyle, transitionDelay: '0.6s' })
                    }}>
                        <Card 
                            bodyStyle={{ padding: 0 }}
                            style={{
                                ...cardStyle,
                                borderTop: `4px solid ${theme.textLight}`
                            }}
                            hoverable
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = `0 25px 50px ${hexToRgba(theme.textLight, 0.2)}`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = `0 15px 35px ${hexToRgba(theme.primaryDark, 0.3)}`;
                            }}
                        >
                            <div style={{ padding: isMobile ? '20px' : '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={iconWrapperStyle(iconColors.valores)}>
                                        <HeartOutlined />
                                    </div>
                                </div>
                                <Title level={4} style={{ marginTop: 0, color: theme.text, marginBottom: '16px' }}>
                                    Valores
                                </Title>
                                <Paragraph style={{ 
                                    color: theme.textLight, 
                                    fontSize: isMobile ? '14px' : '16px',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>
                                    <strong style={{ color: theme.secondary }}>Innovación</strong> constante,{' '}
                                    <strong style={{ color: theme.accent }}>Compromiso</strong> con la excelencia,{' '}
                                    <strong style={{ color: theme.textLight }}>Sostenibilidad</strong> ambiental.
                                </Paragraph>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    );
};