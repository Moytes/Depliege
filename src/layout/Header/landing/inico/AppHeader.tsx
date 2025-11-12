import React, { useState } from 'react';
import { Layout, Flex, Button, Typography, Grid, Image } from 'antd'; 
import { MenuOutlined } from '@ant-design/icons'; 
import { useLocation } from 'react-router-dom';
import { MobileMenu } from '../mobile/MobileMenu'; 
import { DesktopMenu } from '../Desktop/DesktopMenu'; 
import { theme, hexToRgba } from '../../../../theme/landing/invernadero/theme';

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface AppHeaderProps {
    onRegisterClick?: () => void;
    onAboutClick?: () => void;
    onLoginClick?: () => void;
    onLogoClick?: () => void;
    onHomeClick?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
    onRegisterClick,
    onAboutClick,
    onLoginClick,
    onLogoClick,
    onHomeClick 
}) => {
    const screens = useBreakpoint();
    const location = useLocation();

    const [drawerVisible, setDrawerVisible] = useState(false);

    const isMobile = !screens.md;

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isAboutPage = location.pathname === '/about-us';
    const isHomePage = location.pathname === '/' || location.pathname === '/invernaderos';

    const headerStyle: React.CSSProperties = {
        position: 'sticky',
        top: 0,
        width: '100%',
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
        display: 'flex',
        alignItems: 'center',
        padding: screens.xs ? '0 16px' : screens.sm ? '0 24px' : '0 40px',
        height: screens.xs ? '60px' : screens.lg ? '80px' : '72px',
        boxShadow: `0 4px 20px ${hexToRgba(theme.primaryDark, 0.3)}`,
        zIndex: 1000,
        justifyContent: 'space-between',
        borderBottom: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
        backdropFilter: 'blur(10px)',
    };

    const titleStyle: React.CSSProperties = {
        color: theme.text,
        margin: 0,
        userSelect: 'none',
        fontSize: screens.xs ? '16px' : screens.sm ? '18px' : screens.lg ? '22px' : '24px',
        fontWeight: 700,
        background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const menuButtonStyle: React.CSSProperties = {
        color: theme.text,
        fontWeight: 600,
        background: 'transparent',
        border: `1px solid ${hexToRgba(theme.text, 0.2)}`,
        borderRadius: '12px',
        height: screens.xs ? '40px' : '48px',
        padding: '0 20px',
        transition: 'all 0.3s ease',
    };

    const buttonSize = screens.lg ? 'large' : 'middle';

    const handleHomeClick = () => {
        if (onHomeClick) onHomeClick();
        closeDrawer();
    };
    const handleAboutClick = () => {
        if (onAboutClick) onAboutClick();
        closeDrawer();
    };
    const handleLoginClick = () => {
        if (onLoginClick) onLoginClick();
        closeDrawer();
    };
    const handleRegisterClick = () => {
        if (onRegisterClick) onRegisterClick();
        closeDrawer();
    };

    return (
        <Header style={headerStyle}>
            <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                
                <Flex 
                    align="center" 
                    gap={screens.xs ? "small" : screens.sm ? "middle" : "large"}
                    onClick={onLogoClick}
                    style={{ 
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <Image
                        src="/logo.png"
                        alt="Logo UTEQ"
                        preview={false}
                        style={{
                            height: screens.xs ? '35px' : screens.sm ? '40px' : screens.lg ? '50px' : '55px',
                            borderRadius: '12px',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                        }}
                    />
                    <Typography.Title level={5} style={titleStyle}>
                        Invernaderos UTEQ
                    </Typography.Title>
                </Flex>
                
                {isMobile ? (
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ 
                            color: theme.text, 
                            fontSize: screens.xs ? '18px' : '20px' 
                        }} />}
                        onClick={showDrawer}
                        style={{
                            background: hexToRgba(theme.text, 0.1),
                            border: `1px solid ${hexToRgba(theme.text, 0.2)}`,
                            borderRadius: '10px',
                            width: screens.xs ? '40px' : '44px',
                            height: screens.xs ? '40px' : '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                ) : (
                    <DesktopMenu
                        onRegisterClick={onRegisterClick} 
                        onAboutClick={onAboutClick}
                        onLoginClick={onLoginClick}
                        onHomeClick={onHomeClick}
                        isHomePage={isHomePage}
                        isAboutPage={isAboutPage}
                        isLoginPage={isLoginPage}
                        isRegisterPage={isRegisterPage}
                        buttonSize={buttonSize}
                        menuButtonStyle={menuButtonStyle}
                    />
                )}

                <MobileMenu
                    visible={drawerVisible}
                    onClose={closeDrawer}
                    onHomeClick={handleHomeClick} 
                    onAboutClick={handleAboutClick}
                    onLoginClick={handleLoginClick}
                    onRegisterClick={handleRegisterClick}
                    isHomePage={isHomePage}
                    isAboutPage={isAboutPage}
                    isLoginPage={isLoginPage}
                    isRegisterPage={isRegisterPage}
                />

            </Flex>
        </Header>
    );
};