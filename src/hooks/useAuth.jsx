import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const updateUserState = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    useEffect(() => {
        // Actualizar estado inicial
        updateUserState();

        // Escuchar cambios en el localStorage
        window.addEventListener('storage', updateUserState);

        return () => {
            window.removeEventListener('storage', updateUserState);
        };
    }, []);

    return { isAuthenticated, user };
}

export default useAuth;
