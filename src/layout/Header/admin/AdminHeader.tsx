import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Flex, Grid, Typography, Avatar, App, ConfigProvider, Drawer, Space } from 'antd';
import { AppstoreOutlined, UserOutlined, LogoutOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { useBreakpoint } = Grid;

export const theme = {
    primary: '#2A3A6B',
    primaryDark: '#1C2B4E',
    secondary: '#8BC34A',
    secondaryDark: '#689F38',
    accent: '#FBC02D',
    text: '#FFFFFF',
    textLight: '#E0E0E0',
    textMuted: '#A0A0A0',
};

export const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface AdminHeaderProps {
    onMenuClick?: () => void;
}

const allMenuItems = [
    { key: '/admin/profile', icon: <UserOutlined />, label: 'Perfil' },
    { key: '/admin/users', icon: <AppstoreOutlined />, label: 'Gestión de Usuarios' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Cerrar Sesión' },
];

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const location = useLocation();
    const { modal } = App.useApp();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const desktopNavItems = allMenuItems.filter(item => item.key !== 'logout');

    const headerStyle: React.CSSProperties = {
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
        borderBottom: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
        padding: '0 24px',
        boxShadow: `0 4px 20px ${hexToRgba('#000000', 0.2)}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        height: 70,
    };

    const titleStyle: React.CSSProperties = {
        margin: 0,
        background: `linear-gradient(135deg, ${theme.text}, ${theme.textLight})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
        letterSpacing: '0.5px'
    };

    const mobileTriggerStyle: React.CSSProperties = {
        color: theme.text,
        background: hexToRgba(theme.text, 0.1),
        border: `1px solid ${hexToRgba(theme.text, 0.2)}`,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        width: '40px',
        transition: 'all 0.3s ease',
    };

    const desktopLogoutBtnStyle: React.CSSProperties = {
        background: hexToRgba('#ff4d4f', 0.15),
        border: `1px solid ${hexToRgba('#ff4d4f', 0.4)}`,
        color: '#ff7875',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 600,
        height: '36px',
        marginLeft: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease'
    };

    const drawerButtonStyle: React.CSSProperties = {
        borderRadius: '12px', 
        color: theme.text,
        background: hexToRgba(theme.text, 0.05),
        border: `1px solid ${hexToRgba(theme.text, 0.1)}`, 
        height: '50px',
        fontSize: '16px',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 20px',
        marginBottom: '10px',
        width: '100%'
    };

    const handleNavigation = (key: string) => {
        setDrawerVisible(false); 
        
        if (key === 'logout') {
            modal.confirm({
                title: 'Confirmar Cierre de Sesión',
                content: '¿Estás seguro de que deseas cerrar sesión?',
                okText: 'Sí, cerrar sesión',
                cancelText: 'Cancelar',
                centered: true,
                okButtonProps: { 
                    danger: true,
                },
                onOk: () => {
                    localStorage.removeItem('authToken');
                    navigate('/');
                },
            });
        } else {
            navigate(key);
        }
    };

    const handleDesktopMenuClick = ({ key }: { key: string }) => {
        handleNavigation(key);
    };

    return (
        <Header style={headerStyle}>
            <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                <Flex align="center" gap="middle">
                    <div style={{
                        padding: '2px',
                        background: `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`,
                        borderRadius: '50%',
                        display: 'flex'
                    }}>
                        <Avatar
                            size={40}
                            src="/uteq-logo2.png"
                            style={{ 
                                backgroundColor: theme.primaryDark, 
                                border: `2px solid ${theme.primaryDark}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <span style={{color: theme.text, fontWeight: 'bold'}}>U</span>
                        </Avatar>
                    </div>
                    
                    <Typography.Title level={4} style={titleStyle}>
                        Admin Panel
                    </Typography.Title>
                </Flex>

                {screens.md ? (
                    <Flex align="center">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Menu: {
                                        itemColor: hexToRgba(theme.text, 0.7),
                                        itemHoverColor: theme.text,
                                        itemSelectedColor: theme.secondary,
                                        horizontalItemSelectedColor: theme.secondary,
                                        horizontalItemHoverColor: theme.text,
                                        activeBarHeight: 3,
                                        activeBarBorderWidth: 0,
                                        itemBg: 'transparent',
                                        subMenuItemBg: 'transparent',
                                    }
                                }
                            }}
                        >
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                disabledOverflow={true} 
                                items={desktopNavItems}
                                onClick={handleDesktopMenuClick}
                                selectedKeys={[location.pathname]}
                                style={{
                                    borderBottom: 'none',
                                    minWidth: '350px',
                                    justifyContent: 'flex-end',
                                    backgroundColor: 'transparent',
                                    fontSize: '15px',
                                    fontWeight: 500,
                                }}
                            />
                        </ConfigProvider>

                        <Button 
                            type="text"
                            onClick={() => handleNavigation('logout')}
                            icon={<LogoutOutlined />}
                            style={desktopLogoutBtnStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#ff4d4f';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.border = '1px solid #ff4d4f';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = hexToRgba('#ff4d4f', 0.15);
                                e.currentTarget.style.color = '#ff7875';
                                e.currentTarget.style.border = `1px solid ${hexToRgba('#ff4d4f', 0.4)}`;
                            }}
                        >
                            Cerrar Sesión
                        </Button>
                    </Flex>
                ) : (
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ fontSize: '20px' }} />}
                        onClick={() => setDrawerVisible(true)}
                        style={mobileTriggerStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = hexToRgba(theme.secondary, 0.2);
                            e.currentTarget.style.borderColor = theme.secondary;
                            e.currentTarget.style.color = theme.secondary;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = hexToRgba(theme.text, 0.1);
                            e.currentTarget.style.borderColor = hexToRgba(theme.text, 0.2);
                            e.currentTarget.style.color = theme.text;
                        }}
                    />
                )}
            </Flex>

            <Drawer
                title={
                    <Typography.Title level={4} style={titleStyle}>
                        Menú
                    </Typography.Title>
                }
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={300}
                closeIcon={<CloseOutlined style={{ color: theme.text }} />}
                styles={{
                    header: {
                        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
                        borderBottom: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
                    },
                    body: {
                        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
                        padding: '20px',
                    },
                    mask: {
                        backdropFilter: 'blur(3px)',
                    }
                }}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    {allMenuItems.map((item) => (
                        <Button
                            key={item.key}
                            type="text"
                            icon={<span style={{ fontSize: '18px' }}>{item.icon}</span>}
                            onClick={() => handleNavigation(item.key)}
                            style={{
                                ...drawerButtonStyle,
                                ...(item.key === 'logout' ? { 
                                    border: `1px solid ${hexToRgba('#ff4d4f', 0.3)}`,
                                    background: hexToRgba('#ff4d4f', 0.1),
                                    color: '#ff7875' 
                                } : {})
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Space>
            </Drawer>
        </Header>
    );
};