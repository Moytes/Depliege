import React, { useState } from 'react';
import { Layout, Drawer, Menu, Typography, Flex, Avatar } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import { UserHeader } from '../../layout/Header/user/UserHeader';
import { UserFooter } from '../../layout/Footer/user/UserFooter';

import {
    LineChartOutlined,
    ExperimentOutlined,
    SettingOutlined,
    LogoutOutlined,
    CloseOutlined
} from '@ant-design/icons';

const { Content } = Layout;

const menuItems = [
    { key: '/user/monitoring', icon: <LineChartOutlined />, label: 'Monitoreo' },
    { key: '/user/history', icon: <ExperimentOutlined />, label: 'Historial' },
    { key: '/user/settings', icon: <SettingOutlined />, label: 'Configuración' },
    { key: '/login', icon: <LogoutOutlined />, label: 'Cerrar Sesión' },
];

export const UserLayout: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const navigate = useNavigate();


    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key);
        setDrawerVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <UserHeader onMenuClick={() => setDrawerVisible(true)} />

            <Content style={{ padding: '24px' }}>
                <Outlet />
            </Content>

            <UserFooter />

            <Drawer
                title={
                    <Flex justify="space-between" align="center">
                        <Typography.Title level={5} style={{ color: 'white', margin: 0 }}>
                            Menú
                        </Typography.Title>
                        <Avatar
                            size={40}
                            src="/uteq-logo2.png"
                            style={{ backgroundColor: 'white', padding: '4px' }}
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