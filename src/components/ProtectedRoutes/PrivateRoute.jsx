// PrivateRoute.jsx
import { Navigate, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
    console.log("Is authenticated?", isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate replace to="/login" />;
    }

    return children;
}

export default PrivateRoute;
