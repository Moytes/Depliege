import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
import { LoginView } from '../../auth/login/LoginView';
import { RegisterView } from '../../auth/register/RegisterView';
import { AppHeader } from '../../../layout/Header/landing/inico/AppHeader';
import { AppFooter } from '../../../layout/Footer/landing/inicio/AppFooter';
import { AboutUsView } from '../../landing/about/AboutUsView';
import { InvernaderoUteqView } from '../../landing/invernadero/InvernaderoUteqView'; 
import { theme } from '../../../theme/landing/invernadero/theme';

const { Content } = Layout;

const defaultContentStyle: React.CSSProperties = {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: theme.primaryDark,
    minHeight: 'calc(100vh - 120px)',
};

const fullWidthContentStyle: React.CSSProperties = {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.primaryDark,
};

export const ResponsiveView = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const fullWidthRoutes = ['/', '/invernaderos', '/about-us', '/login', '/register'];
    const isFullWidthRoute = fullWidthRoutes.includes(location.pathname);

    const activeContentStyle = isFullWidthRoute 
        ? fullWidthContentStyle 
        : defaultContentStyle;

    const layoutStyle: React.CSSProperties = {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`,
    };

    return (
        <ConfigProvider 
            theme={{ 
                token: { 
                    colorPrimary: theme.secondary,
                    colorPrimaryHover: theme.accent,
                    colorBgLayout: theme.primaryDark,
                    colorText: theme.text,
                    colorTextSecondary: theme.textLight,
                    colorTextTertiary: theme.textMuted,
                    borderRadius: 8,
                    wireframe: false,
                },
                components: {
                    Layout: {
                        bodyBg: theme.primaryDark,
                        headerBg: theme.primary,
                        footerBg: theme.primaryDark,
                    }
                }
            }}
        >
            <Layout style={layoutStyle}>
                
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