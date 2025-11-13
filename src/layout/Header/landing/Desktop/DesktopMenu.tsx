import React from 'react';
import {  Button, Flex } from 'antd';
import { 
    UserAddOutlined, 
    LoginOutlined, 
    HomeOutlined, 
    TeamOutlined
} from '@ant-design/icons';
import { theme, hexToRgba } from '../../../../theme/landing/invernadero/theme';

interface DesktopMenuProps {
    onRegisterClick?: () => void;
    onAboutClick?: () => void;
    onLoginClick?: () => void;
    onHomeClick?: () => void;
    isHomePage: boolean;
    isAboutPage: boolean;
    isLoginPage: boolean;
    isRegisterPage: boolean;
    buttonSize: 'large' | 'middle';
    menuButtonStyle: React.CSSProperties;
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({
    onRegisterClick,
    onAboutClick,
    onLoginClick,
    onHomeClick,
    isHomePage,
    isAboutPage,
    isLoginPage,
    isRegisterPage,
    buttonSize,
    menuButtonStyle
}) => {
    
    const baseButtonStyle: React.CSSProperties = {
        ...menuButtonStyle,
        transition: 'all 0.3s ease',
        background: 'transparent',
        border: `1px solid ${hexToRgba(theme.text, 0.2)}`,
        color: theme.text,
    };

    const registerButtonStyle: React.CSSProperties = {
        ...baseButtonStyle,
        background: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
        border: 'none',
        color: theme.primaryDark,
        fontWeight: 700,
        boxShadow: `0 4px 15px ${hexToRgba(theme.secondary, 0.3)}`,
    };

    // Estilos específicos para hover
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
            transform: 'translateY(-2px)',
        };
    };

    return (
        <Flex gap={buttonSize === 'large' ? 'middle' : 'small'} align="center">
            {!isHomePage && (
                <Button
                    size={buttonSize}
                    type="text"
                    style={baseButtonStyle}
                    icon={<HomeOutlined />}
                    onClick={onHomeClick}
                    onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, getHoverStyle());
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, baseButtonStyle);
                    }}
                >
                    Inicio
                </Button>
            )}
            {!isAboutPage && (
                <Button 
                    size={buttonSize} 
                    type="text"
                    style={baseButtonStyle}
                    onClick={onAboutClick} 
                    icon={<TeamOutlined />}
                    onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, getHoverStyle());
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, baseButtonStyle);
                    }}
                >
                    Sobre Nosotros
                </Button>
            )}
            {!isLoginPage && (
                <Button
                    size={buttonSize}
                    type="text"
                    style={baseButtonStyle}
                    icon={<LoginOutlined />}
                    onClick={onLoginClick}
                    onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, getHoverStyle());
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, baseButtonStyle);
                    }}
                >
                    Iniciar Sesión
                </Button>
            )}
            {!isRegisterPage && (
                <Button 
                    size={buttonSize} 
                    type="primary"
                    style={registerButtonStyle}
                    icon={<UserAddOutlined />} 
                    onClick={onRegisterClick}
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
        </Flex>
    );
};