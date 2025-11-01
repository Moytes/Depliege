import React from 'react';
import { Drawer, Typography, Space, Button } from 'antd';
import { 
    UserAddOutlined,
    LoginOutlined,
    HomeOutlined,
    TeamOutlined,
    CloseOutlined 
} from '@ant-design/icons';

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
        borderRadius: '12px', 
        color: 'rgba(255, 255, 255, 0.9)',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        height: '48px',
        fontSize: '16px',
        fontWeight: 500,
    };

    return (
        <Drawer
            title={
                <Typography.Title level={4} style={{ color: 'white', margin: 0 }}>
                    Menú
                </Typography.Title>
            }
            placement="right"
            onClose={onClose}
            visible={visible}

            headerStyle={{ 
                backgroundColor: '#003366',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
            }}

            drawerStyle={{ 
                backgroundColor: '#003366',
                borderRadius: '15px 0 0 15px',
            }}
            closeIcon={<CloseOutlined style={{ color: 'white', fontSize: '18px' }} />}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {!isHomePage && (
                    <Button 
                        type="text" 
                        size="large" 
                        icon={<HomeOutlined />} 
                        onClick={onHomeClick} 
                        block
                        style={mobileButtonStyle} 
                    >
                        Inicio
                    </Button>
                )}
                {!isAboutPage && (
                    <Button 
                        type="text" 
                        size="large" 
                        icon={<TeamOutlined />} 
                        onClick={onAboutClick} 
                        block
                        style={mobileButtonStyle} 
                    >
                        Sobre Nosotros
                    </Button>
                )}
                {!isLoginPage && (
                    <Button 
                        type="text" 
                        size="large" 
                        icon={<LoginOutlined />} 
                        onClick={onLoginClick} 
                        block
                        style={mobileButtonStyle} 
                    >
                        Login
                    </Button>
                )}
                {!isRegisterPage && (
                    <Button 
                        type="text" 
                        size="large" 
                        icon={<UserAddOutlined />} 
                        onClick={onRegisterClick} 
                        block
                        style={mobileButtonStyle} 
                    >
                        Registrar
                    </Button>
                )}
            </Space>
        </Drawer>
    );
};