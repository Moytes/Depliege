import React from 'react';
import { Layout, Typography, Divider, Grid } from 'antd';

import { FooterMobile } from '../mobile/FooterMobile'; 
import { FooterDesktop } from '../Desktop/FooterDesktop';
import { theme, hexToRgba } from '../../../../theme/landing/invernadero/theme';

const { Footer } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid; 

export const AppFooter: React.FC = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const footerStyle: React.CSSProperties = {
        background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`,
        color: theme.text,
        padding: screens.xs ? '32px 16px' : screens.sm ? '40px 24px' : '48px 32px',
        boxShadow: `0 -4px 20px ${hexToRgba(theme.primaryDark, 0.3)}`,
        zIndex: 10,
        borderTop: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
    };

    return (
        <Footer style={footerStyle}>
            {isMobile ? (
                <FooterMobile screens={screens} />
            ) : (
                <FooterDesktop screens={screens} />
            )}

            <Divider style={{ 
                backgroundColor: hexToRgba(theme.textLight, 0.2), 
                margin: screens.xs ? '32px 0 20px' : '40px 0 24px' 
            }} />
            
            <Text style={{ 
                textAlign: 'center', 
                display: 'block', 
                color: hexToRgba(theme.textLight, 0.7),
                fontSize: screens.xs ? '14px' : '15px',
                fontWeight: 400,
            }}>
                ©{new Date().getFullYear()} Invernaderos UTEQ. Todos los derechos reservados.
            </Text>
        </Footer>
    );
};