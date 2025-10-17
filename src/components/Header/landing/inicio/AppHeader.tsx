import React from 'react';
import { Layout, Flex, Button, Typography, Grid, Image } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom'; // <-- 1. Importar el hook

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface AppHeaderProps {
    // 2. Hacemos la prop opcional, ya que no siempre será necesaria
    onRegisterClick?: () => void; 
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onRegisterClick }) => {
    const screens = useBreakpoint();
    const location = useLocation(); // <-- 3. Obtener la información de la ruta actual

    // 4. Definimos la condición: mostrar el botón si la ruta NO es '/registro'
    const showRegisterButton = location.pathname !== '/registro';

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
        borderRadius: '0 0 15px 15px',
    };

    const titleStyle: React.CSSProperties = {
        color: 'white',
        margin: 0,
        userSelect: 'none',
        fontSize: screens.sm ? (screens.lg ? '22px' : '18px') : '16px',
    };

    const buttonSize = screens.sm ? (screens.lg ? 'large' : 'middle') : 'small';

    return (
        <Header style={headerStyle}>
            <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                <Flex align="center" gap="middle">
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
                
                {/* 5. Renderizado condicional del botón */}
                {showRegisterButton && (
                    <Button 
                        size={buttonSize} 
                        type="primary" 
                        icon={<UserAddOutlined />} 
                        onClick={onRegisterClick}
                    >
                        Registrar
                    </Button>
                )}
            </Flex>
        </Header>
    );
};