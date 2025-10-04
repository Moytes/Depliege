import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Flex, Grid, Typography, Avatar } from 'antd';
import {
    AppstoreOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface AdminHeaderProps {
    onMenuClick: () => void;
}

const menuItems = [
    { key: '/admin/profile', icon: <UserOutlined />, label: 'Perfil' },
    { key: '/admin/users', icon: <AppstoreOutlined />, label: 'Gestión de Usuarios' },
    { key: '/login', icon: <LogoutOutlined />, label: 'Cerrar Sesión' },
];

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
    const screens = useBreakpoint();

    const navigate = useNavigate();

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

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key);
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
                        Admin Panel
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