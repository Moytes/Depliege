import React from 'react';
import { App as AntApp } from 'antd';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ResponsiveView } from './views/landing/Inicio/ResponsiveView';
import { AdminLayout } from './views/admin/AdminLayout';
import { UserLayout } from './views/user/UserLayout';

import { AdminWelcomeView } from './views/admin/page/dashboard/AdminWelcomeView';
import { AdminProfileView } from './views/admin/page/perfile/AdminProfileView';
import { UserManagementView } from './views/admin/page/gestionuser/UserManagementView';

import { WelcomeUserView } from './views/user/dasbord/WelcomeUserView';
import { GestionInvernaderoView } from './views/user/gestionInvernadero/GestionInvernaderoView';
import { GestionInvernaderoFrioView } from './views/user/gestionInvernadero/climafrio/GestionInvernaderoFrioView';
import { GestionInvernaderoCalidoView } from './views/user/gestionInvernadero/climacalido/GestionInvernaderoCalidoView';
import { UserProfileView } from './views/user/profile/UserProfileView';
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
                        <Route path="profile" element={<UserProfileView />} />
                        <Route path="gestion-invernadero" element={<GestionInvernaderoView />} />
                        <Route path="gestion-invernadero/frio" element={<GestionInvernaderoFrioView />} />
                        <Route path="gestion-invernadero/calido" element={<GestionInvernaderoCalidoView />} />
                    </Route>

                    <Route path="/*" element={<ResponsiveView />} />
                </Routes>
            </BrowserRouter>
        </AntApp>
    );
}

export default App;

