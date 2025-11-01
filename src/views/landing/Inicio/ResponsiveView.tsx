import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 

import { LoginView } from '../../auth/login/LoginView';
import { RegisterView } from '../../auth/register/RegisterView';
import { AppHeader } from '../../../layout/Header/landing/inico/AppHeader';
import { AppFooter } from '../../../layout/Footer/landing/inicio/AppFooter';
import { AboutUsView } from '../../landing/about/AboutUsView';
import { InvernaderoUteqView } from '../../landing/invernadero/InvernaderoUteqView'; 

const { Content } = Layout;

const colors = {
    green: '#66BB6A',
    greenDark: '#2E7D32',
};

const defaultContentStyle: React.CSSProperties = {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 16px',
    backgroundColor: '#f4f6f8',
};

const fullWidthContentStyle: React.CSSProperties = {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column'
};

export const ResponsiveView = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const fullWidthRoutes = ['/', '/invernaderos', '/about-us', '/login', '/register'];
    const isFullWidthRoute = fullWidthRoutes.includes(location.pathname);

    const activeContentStyle = isFullWidthRoute 
        ? fullWidthContentStyle 
        : defaultContentStyle;

    return (
        <ConfigProvider theme={{ token: { colorPrimary: colors.green, colorPrimaryHover: colors.greenDark } }}>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                
                <AppHeader 
                    onRegisterClick={() => navigate('/register')}
                    onAboutClick={() => navigate('/about-us')}
                    onLoginClick={() => navigate('/login')} 
                    onLogoClick={() => navigate('/')} 
                    onHomeClick={() => navigate('/')} 
                />
                <Content style={activeContentStyle}>
                    <Routes>
                        <Route 
                            path="/" 
                            element={<InvernaderoUteqView />} 
                        />
                        <Route 
                            path="/invernaderos"
                            element={<InvernaderoUteqView />} 
                        />
                        <Route 
                            path="/about-us" 
                            element={<AboutUsView />} 
                        />
                        <Route 
                            path="/login" 
                            element={<LoginView />} 
                        />
                        <Route 
                            path="/register" 
                            element={<RegisterView onBackToLogin={() => navigate('/login')} />} 
                        />
                        
                    </Routes>
                </Content>

                <AppFooter />
            </Layout>
        </ConfigProvider>
    );
};