import React from 'react';
import 'antd/dist/reset.css';
import { App as AntApp } from 'antd';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Vistas públicas y de Layout
import { ResponsiveView } from './views/landing/Inicio/ResponsiveView';
import { AdminLayout } from './views/admin/AdminLayout';
import { UserLayout } from './views/user/UserLayout';

// Vistas de Admin
import { AdminWelcomeView } from './views/admin/page/dashboard/AdminWelcomeView';
import { AdminProfileView } from './views/admin/page/perfile/AdminProfileView';
import { UserManagementView } from './views/admin/page/gestionuser/UserManagementView';
import { WelcomeUserView } from './views/user/dasbord/WelcomeUserView';
import { ProtectedRoute } from './types/routes/ProtectedRoute';

function App() {
    return (
        <AntApp>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<AdminWelcomeView />} />
                        <Route path="profile" element={<AdminProfileView />} />
                        <Route path="users" element={<UserManagementView />} />
                    </Route>

                    <Route 
                        path="/user" 
                        element={
                            <ProtectedRoute>
                                <UserLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="welcome" replace />} />
                        <Route path="welcome" element={<WelcomeUserView />} />
                    </Route>

                    <Route path="/*" element={<ResponsiveView />} />
                </Routes>
            </BrowserRouter>
        </AntApp>
    );
}

export default App;

