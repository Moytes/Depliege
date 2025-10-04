import React from 'react';
import 'antd/dist/reset.css';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ResponsiveView } from './views/landing/Inicio/ResponsiveView';

import { AdminLayout } from './views/admin/AdminLayout';
import { UserLayout } from './views/user/UserLayout'; // 2. Se importa el nuevo UserLayout
import { AdminWelcomeView } from './views/admin/page/dashboard/AdminWelcomeView';
import { AdminProfileView } from './views/admin/page/perfile/AdminProfileView';
import { UserManagementView } from './views/admin/page/gestionuser/UserManagementView';

import { WelcomeUserView } from './views/user/dasbord/WelcomeUserView';

function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<AdminWelcomeView />} />
                        <Route path="profile" element={<AdminProfileView />} />
                        <Route path="users" element={<UserManagementView />} />
                    </Route>

                    <Route path="/user" element={<UserLayout />}>
                        <Route index element={<Navigate to="welcome" replace />} />
                        <Route path="welcome" element={<WelcomeUserView />} />
                    </Route>
                    <Route path="/*" element={<ResponsiveView />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;