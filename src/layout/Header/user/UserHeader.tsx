import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Flex, Grid, Typography, Avatar, App } from 'antd'; // Importar App
import {
    LogoutOutlined,
    MenuOutlined,
    AppstoreOutlined,
    UserOutlined,
    EnvironmentOutlined // <- Añadir este icono
} from '@ant-design/icons';

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface UserHeaderProps {
    onMenuClick: () => void;
}

// Se agrega el nuevo item para el perfil y se reordenan
const menuItems = [
    { key: '/user/profile', icon: <UserOutlined />, label: 'Mi Perfil' },
    // CAMBIO: Usamos el icono EnvironmentOutlined para consistencia
    { key: '/user/gestion-invernadero', icon: <EnvironmentOutlined />, label: 'Gestión Invernadero' },
    // CAMBIO: La llave debe ser 'logout' para ser capturada por el handler
    { key: 'logout', icon: <LogoutOutlined />, label: 'Cerrar Sesión' },
];

export const UserHeader: React.FC<UserHeaderProps> = ({ onMenuClick }) => {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const { modal } = App.useApp(); // <- Añadir para el modal

    const headerStyle: React.CSSProperties = {
        backgroundColor: '#003366',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        height: 64,
    };

    const titleStyle: React.CSSProperties = {
        color: 'white',
        margin: 0,
    };

    // CAMBIO: Lógica de logout corregida
    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === 'logout') {
            modal.confirm({
                title: 'Confirmar Cierre de Sesión',
                content: '¿Estás seguro de que deseas cerrar sesión?',
                okText: 'Sí, cerrar sesión',
                cancelText: 'Cancelar',
                onOk: () => {
                    localStorage.removeItem('authToken');
                    navigate('/'); // Redirigir a la página principal (landing)
                },
            });
        } else {
            navigate(key);
        }
    };

    return (
        <Header style={headerStyle}>
            <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                <Flex align="center" gap="middle">
                    <Avatar
                        size={40}
                        src="/uteq-logo2.png"
                        style={{ backgroundColor: 'white', padding: '4px' }}
                    />
                    <Typography.Title level={4} style={titleStyle}>
                        Panel de Usuario
                    </Typography.Title>
                </Flex>

                {screens.md ? (
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={menuItems}
                        onClick={handleMenuClick}
                        style={{
                            borderBottom: 'none',
                            minWidth: '350px',
                            backgroundColor: 'transparent',
                        }}
                        // Opcional: seleccionar la tecla activa basada en la ruta
                        selectedKeys={[window.location.pathname]}
                    />
                ) : (
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ color: 'white' }} />}
                        onClick={onMenuClick}
                    />
                )}
            </Flex>
        </Header>
    );
};