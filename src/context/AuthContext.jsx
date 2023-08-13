import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user'));
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setCurrentUser(storedUser);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    const contextValue = {
        currentUser,
        logout
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
