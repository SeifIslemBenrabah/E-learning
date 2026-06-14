import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthData } from '../../Auth/AuthContext';
import { routesConfig } from './RoutesConfig';

const RenderRoutes = () => {
    const { user } = AuthData();

    const renderRoutes = (routes) => {
        return routes.map(({ path, element, children }, index) => (
            <Route key={index} path={path} element={element}>
                {children && renderRoutes(children)}
            </Route>
        ));
    };

    // Extract public page elements into plain variables (JSX can't call .find() as a tag)
    const publicMap = Object.fromEntries(
        routesConfig.public.map(r => [r.path, r.element])
    );

    const loginRedirect = user.isAuthenticated
        ? <Navigate to={
            user.role === 'admin' ? '/admin/Dashboard'
            : user.role === 'teacher' ? '/teacher/Dashboard'
            : '/student/Home'
          } replace />
        : publicMap['/Login'];

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={publicMap['/']} />
            <Route path="/Login" element={loginRedirect} />
            <Route path="/forgot-password" element={publicMap['/forgot-password']} />

            {/* Student routes */}
            {user.isAuthenticated && user.role === 'student' && (
                <>
                    {renderRoutes(routesConfig.student)}
                    <Route path="*" element={<Navigate to="/student/Home" replace />} />
                </>
            )}

            {/* Teacher routes */}
            {user.isAuthenticated && user.role === 'teacher' && (
                <>
                    {renderRoutes(routesConfig.teacher)}
                    <Route path="*" element={<Navigate to="/teacher/Dashboard" replace />} />
                </>
            )}

            {/* Admin routes */}
            {user.isAuthenticated && user.role === 'admin' && (
                <>
                    {renderRoutes(routesConfig.admin)}
                    <Route path="*" element={<Navigate to="/admin/Dashboard" replace />} />
                </>
            )}

            {/* Catch-all: redirect unauthenticated users to login */}
            {!user.isAuthenticated && (
                <Route path="*" element={<Navigate to="/Login" replace />} />
            )}
        </Routes>
    );
};

export default RenderRoutes;
