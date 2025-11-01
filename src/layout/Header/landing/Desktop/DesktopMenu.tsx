import React from 'react';
import { Space, Button } from 'antd';
import { 
    UserAddOutlined, 
    LoginOutlined, 
    HomeOutlined, 
    TeamOutlined 
} from '@ant-design/icons';

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
    return (
        <Space size={buttonSize === 'large' ? 'middle' : 'small'}>
            {!isHomePage && (
                <Button
                    size={buttonSize}
                    type="primary" 
                    style={menuButtonStyle}
                    icon={<HomeOutlined />}
                    onClick={onHomeClick}
                >
                    Inicio
                </Button>
            )}
            {!isAboutPage && (
                <Button 
                    size={buttonSize} 
                    type="primary" 
                    style={menuButtonStyle}
                    onClick={onAboutClick} 
                    icon={<TeamOutlined />} 
                >
                    Sobre Nosotros
                </Button>
            )}
            {!isLoginPage && (
                <Button
                    size={buttonSize}
                    type="primary" 
                    icon={<LoginOutlined />}
                    onClick={onLoginClick} 
                >
                    Login
                </Button>
            )}
            {!isRegisterPage && (
                <Button 
                    size={buttonSize} 
                    type="primary" 
                    icon={<UserAddOutlined />} 
                    onClick={onRegisterClick} 
                >
                    Registrar
                </Button>
            )}
        </Space>
    );
};