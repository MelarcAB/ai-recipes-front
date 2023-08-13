
import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    return { isAuthenticated, user };
}

export default useAuth;
