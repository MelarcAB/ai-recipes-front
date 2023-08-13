// PublicRoute.jsx
import { Navigate, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PublicRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate replace to="/home" />;
    }

    return children;
}
export default PublicRoute;
