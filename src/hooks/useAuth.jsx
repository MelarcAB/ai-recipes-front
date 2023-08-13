import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Nuevo estado

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
        setLoading(false);  // Establecer loading a false después de verificar
    };

    useEffect(() => {
        updateUserState();
        window.addEventListener('storage', updateUserState);
        return () => {
            window.removeEventListener('storage', updateUserState);
        };
    }, []);

    return { isAuthenticated, user, loading };  // Incluye loading en la respuesta
}



export default useAuth;
