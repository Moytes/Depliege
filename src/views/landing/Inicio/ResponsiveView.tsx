import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { LoginView } from '../../auth/login/LoginView';
import { RegisterView } from '../../auth/register/RegisterView';
import { AppHeader } from '../../../components/Header/landing/inicio/AppHeader';
import { AppFooter } from '../../../components/Footer/landing/inico/AppFooter';

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
    padding: '24px 16px', // ANTES: '24px'
    backgroundColor: '#f4f6f8',
};

export const ResponsiveView = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        alert('¡Inicio de sesión exitoso!');
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: colors.green, colorPrimaryHover: colors.greenDark } }}>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <AppHeader onRegisterClick={() => navigate('/register')} />

                <Content style={contentStyle}>
                    <Routes>
                        <Route 
                            path="/login" 
                            element={<LoginView onLoginSuccess={handleLoginSuccess} />} 
                        />
                        <Route 
                            path="/register" 
                            element={<RegisterView onBackToLogin={() => navigate('/login')} />} 
                        />
                        <Route 
                            path="*" 
                            element={<LoginView onLoginSuccess={handleLoginSuccess} />} 
                        />
                    </Routes>
                </Content>

                <AppFooter />
            </Layout>
        </ConfigProvider>
    );
};