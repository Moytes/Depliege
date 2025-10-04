import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Drawer, Menu, Typography, Flex, Avatar } from 'antd';
import { Outlet } from 'react-router-dom';

import { AdminHeader } from '../../components/Header/admin/AdminHeader';
import { AdminFooter } from '../../components/Footer/admin/AdminFooter';

import {
    DashboardOutlined,
    AppstoreOutlined,
    UserOutlined,
    LogoutOutlined,
    CloseOutlined
} from '@ant-design/icons';

const { Content } = Layout;

const menuItems = [
    { key: '/admin/profile', icon: <UserOutlined />, label: 'Perfil' },
    { key: '/admin/users', icon: <AppstoreOutlined />, label: 'Gestión de Usuarios' },
    { key: '/login', icon: <LogoutOutlined />, label: 'Cerrar Sesión' },
];

export const AdminLayout: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key);
        setDrawerVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <AdminHeader onMenuClick={() => setDrawerVisible(true)} />

            <Content style={{ padding: '24px' }}>
                <Outlet />
            </Content>

            <AdminFooter />

            <Drawer
                title={
                    <Flex justify="space-between" align="center">
                        <Typography.Title level={5} style={{ color: 'white', margin: 0 }}>
                            Menú
                        </Typography.Title>
                        <Avatar
                            size={40}
                            src="/uteq-logo2.png"
                            style={{
                                backgroundColor: 'white',
                                padding: '4px'
                            }}
                        />
                    </Flex>
                }
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                closeIcon={<CloseOutlined style={{ color: 'white' }} />}
                headerStyle={{ backgroundColor: '#003366', borderBottom: 'none' }}
                bodyStyle={{ backgroundColor: '#003366', padding: 0 }}
            >
                <Menu
                    theme="dark"
                    mode="vertical"
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{ backgroundColor: 'transparent', borderRight: 'none' }}
                />
            </Drawer>
        </Layout>
    );
};









