import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PrivateRoute() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return null;
    }
    if (!isAuthenticated) {
        console.log('No autenticado');
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}


export default PrivateRoute;
