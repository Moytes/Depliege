import React from 'react';
import { Drawer, Typography, Space, Button, Flex } from 'antd';
import { LoginOutlined,HomeOutlined,TeamOutlined,CloseOutlined,UserAddOutlined} from '@ant-design/icons';
import { theme, hexToRgba } from '../../../../theme/landing/invernadero/theme';

interface MobileMenuProps {
    visible: boolean;
    onClose: () => void;
    onHomeClick: () => void;
    onAboutClick: () => void;
    onLoginClick: () => void;
    onRegisterClick: () => void;
    isHomePage: boolean;
    isAboutPage: boolean;
    isLoginPage: boolean;
    isRegisterPage: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
    visible,
    onClose,
    onHomeClick,
    onAboutClick,
    onLoginClick,
    onRegisterClick,
    isHomePage,
    isAboutPage,
    isLoginPage,
    isRegisterPage
}) => {

    const mobileButtonStyle: React.CSSProperties = {
        borderRadius: '14px', 
        color: theme.text,
        background: hexToRgba(theme.text, 0.05),
        border: `1px solid ${hexToRgba(theme.text, 0.15)}`, 
        height: '56px',
        fontSize: '16px',
        fontWeight: 600,
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 20px',
    };

    const registerButtonStyle: React.CSSProperties = {
        ...mobileButtonStyle,
        background: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
        color: theme.primaryDark,
        border: 'none',
        fontWeight: 700,
        boxShadow: `0 4px 15px ${hexToRgba(theme.secondary, 0.3)}`,
    };

    const getHoverStyle = (isRegister = false) => {
        if (isRegister) {
            return {
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})`,
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${hexToRgba(theme.secondary, 0.4)}`,
                color: theme.primaryDark,
            };
        }
        return {
            background: hexToRgba(theme.secondary, 0.1),
            border: `1px solid ${theme.secondary}`,
            color: theme.secondary,
            transform: 'translateX(8px)',
        };
    };

    return (
        <Drawer
            title={
                <Flex align="center" justify="space-between" style={{ width: '100%' }}>
                    <Typography.Title level={4} style={{ 
                        color: theme.text, 
                        margin: 0,
                        background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Navegación
                    </Typography.Title>
                </Flex>
            }
            placement="right"
            onClose={onClose}
            open={visible}
            headerStyle={{ 
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
                borderBottom: `1px solid ${hexToRgba(theme.textLight, 0.1)}`, 
                borderRadius: '0',
            }}
            bodyStyle={{
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
                padding: '24px 20px',
            }}
            styles={{
                body: {
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
                }
            }}
            closeIcon={<CloseOutlined style={{ 
                color: theme.text, 
                fontSize: '20px',
                background: hexToRgba(theme.text, 0.1),
                borderRadius: '8px',
                padding: '4px',
            }} />}
            width={300}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {!isHomePage && (
                    <Button 
                        type="text" 
                        size="large" 
                        icon={<HomeOutlined style={{ fontSize: '18px' }} />} 
                        onClick={onHomeClick} 
                        block
                        style={mobileButtonStyle}
                        onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, getHoverStyle());
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.currentTarget.style, mobileButtonStyle);
                        }}
                    >
                        Inicio
                    </Button>
                )}
                {!isAboutPage && (
                    <Button 
                        type="text" 
                        size="large" 
                        icon={<TeamOutlined style={{ fontSize: '18px' }} />} 
                        onClick={onAboutClick} 
                        block
                        style={mobileButtonStyle}
                        onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, getHoverStyle());
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.currentTarget.style, mobileButtonStyle);
                        }}
                    >
                        Sobre Nosotros
                    </Button>
                )}
                {!isLoginPage && (
                    <Button 
                        type="text" 
                        size="large" 
                        icon={<LoginOutlined style={{ fontSize: '18px' }} />} 
                        onClick={onLoginClick} 
                        block
                        style={mobileButtonStyle}
                        onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, getHoverStyle());
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.currentTarget.style, mobileButtonStyle);
                        }}
                    >
                        Iniciar Sesión
                    </Button>
                )}
                {!isRegisterPage && (
                    <Button 
                        type="text" 
                        size="large" 
                        icon={<UserAddOutlined style={{ fontSize: '18px' }} />} 
                        onClick={onRegisterClick} 
                        block
                        style={registerButtonStyle}
                        onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, getHoverStyle(true));
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.currentTarget.style, registerButtonStyle);
                        }}
                    >
                        Registrarse
                    </Button>
                )}
            </Space>
        </Drawer>
    );
};