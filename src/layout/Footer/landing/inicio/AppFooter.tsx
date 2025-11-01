import React from 'react';
import { Layout, Typography, Divider, Grid } from 'antd';

import { FooterMobile } from '../mobile/FooterMobile'; 
import { FooterDesktop } from '../Desktop/FooterDesktop';

const { Footer } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid; 

const footerStyle: React.CSSProperties = {
    backgroundColor: '#003366',
    color: 'rgba(255, 255, 255, 0.85)',
    padding: '48px 24px',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 10,
};



export const AppFooter: React.FC = () => {

    const screens = useBreakpoint();


    const isMobile = !screens.md;

    return (
        <Footer style={footerStyle}>

            {isMobile ? (
                <FooterMobile screens={screens} />
            ) : (
                <FooterDesktop screens={screens} />
            )}

            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', margin: '40px 0 24px' }} />
            
            <Text style={{ textAlign: 'center', display: 'block', color: 'rgba(255, 255, 255, 0.45)' }}>
                ©{new Date().getFullYear()} Invernaderos UTEQ. Todos los derechos reservados.
            </Text>
        </Footer>
    );
};