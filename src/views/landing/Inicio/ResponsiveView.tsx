import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { LoginView } from '../../auth/login/LoginView';
import { RegisterView } from '../../auth/register/RegisterView';
import { AppHeader } from '../../../layout/Header/landing/inico/AppHeader';
import { AppFooter } from '../../../layout/Footer/landing/inicio/AppFooter';

const { Content } = Layout;

const colors = {
    green: '#66BB6A',
    greenDark: '#2E7D32',
};

const contentStyle: React.CSSProperties = {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 16px',
    backgroundColor: '#f4f6f8',
};

export const ResponsiveView = () => {
    const navigate = useNavigate();

    // Se elimina la función handleLoginSuccess, ya no es necesaria.
    // El componente LoginView ahora maneja todo el proceso internamente.

    return (
        <ConfigProvider theme={{ token: { colorPrimary: colors.green, colorPrimaryHover: colors.greenDark } }}>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <AppHeader onRegisterClick={() => navigate('/register')} />

                <Content style={contentStyle}>
                    <Routes>
                        <Route 
                            path="/login" 
                            // Se elimina la prop 'onLoginSuccess' porque LoginView ya maneja la redirección.
                            element={<LoginView />} 
                        />
                        <Route 
                            path="/register" 
                            element={<RegisterView onBackToLogin={() => navigate('/login')} />} 
                        />
                        <Route 
                            path="*" 
                            // Se elimina también aquí la prop 'onLoginSuccess'.
                            element={<LoginView />} 
                        />
                    </Routes>
                </Content>

                <AppFooter />
            </Layout>
        </ConfigProvider>
    );
};