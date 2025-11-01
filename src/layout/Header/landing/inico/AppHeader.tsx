import React, { useState } from 'react';
import { Layout, Flex, Button, Typography, Grid, Image } from 'antd'; 
import { MenuOutlined } from '@ant-design/icons'; 
import { useLocation } from 'react-router-dom';
import { MobileMenu } from '../mobile/MobileMenu'; 
import { DesktopMenu } from '../Desktop/DesktopMenu'; 

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
        backgroundColor: '#003366',
        display: 'flex',
        alignItems: 'center',
        padding: screens.sm ? (screens.lg ? '0 40px' : '0 24px') : '0 16px',
        height: screens.lg ? 72 : 64,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        zIndex: 10,
        justifyContent: 'space-between',
    };

    const titleStyle: React.CSSProperties = {
        color: 'white',
        margin: 0,
        userSelect: 'none',
        fontSize: screens.sm ? (screens.lg ? '22px' : '18px') : '16px',
    };

    const menuButtonStyle: React.CSSProperties = {
        color: '#f0f0f0',
        fontWeight: 500
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
                    gap={screens.sm ? "middle" : "small"}
                    onClick={onLogoClick}
                    style={{ cursor: 'pointer' }}
                >
                    <Image
                        src="/logo.png"
                        alt="Logo UTEQ"
                        preview={false}
                        style={{
                            height: screens.lg ? '50px' : '40px',
                            borderRadius: '8px'
                        }}
                    />
                    <Typography.Title level={5} style={titleStyle}>
                        Invernaderos UTEQ
                    </Typography.Title>
                </Flex>
                
                {isMobile ? (
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ color: 'white', fontSize: '20px' }} />}
                        onClick={showDrawer}
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