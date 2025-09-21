import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthData } from '../../Auth/AuthWrapper';
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

    return (
        <Routes>
            {/* Public Routes */}
            {renderRoutes(routesConfig.public)}

            {/* Student Routes */}
            {user.isAuthenticated && user.role === 'student' && 
            (
                <>
                    {renderRoutes(routesConfig.student)}
                    <Route path="*" element={<Navigate to="/student" replace />} />
                </>
            )}
            {/* Teacher Routes */}
            {user.isAuthenticated && user.role === 'teacher' && 
            (
                <>
                    {renderRoutes(routesConfig.teacher)}
                    <Route path="*" element={<Navigate to="/teacher/Dashboard" replace />} />
                </>
            )}
            

            {/* Admin Routes with Sub-Routes */}
            {user.isAuthenticated && user.role === 'admin' &&
             (
                <>
                    {renderRoutes(routesConfig.admin)}
                    <Route path="*" element={<Navigate to="/admin/Dashboard" replace />} />
                </>
            )}
        </Routes>
    );
};

export default RenderRoutes;
