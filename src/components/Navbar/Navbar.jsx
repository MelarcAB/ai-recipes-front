import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantMenu, Person, Build, Logout } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { VITE_APP_NAME: appName } = import.meta.env;
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser, logout } = useContext(AuthContext);

    const handleLogoutClick = () => {
        logout();
        window.location.reload();
    };

    const isAuthenticated = !!currentUser;

    return (
        <nav className="bg-indigo-600 text-white h-14 w-screen fixed top-0 left-0 flex justify-between items-center px-4 shadow-md z-50">
            <Link to="/" className="flex items-center space-x-2">
                <RestaurantMenu className="text-2xl text-white" />
                <span className='text-2xl text-white font-Inter'>{appName}</span>
            </Link>

            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <div className="relative">
                        <div onClick={() => setShowMenu(!showMenu)} className="flex items-center cursor-pointer space-x-2 hover:bg-indigo-500 p-2 rounded transition duration-150">
                            <Person className="text-white" />
                            <span className="text-white font-medium">{currentUser.name}</span>
                        </div>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <Link to="/settings" className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white w-full">
                                    <span className="flex items-center">
                                        <Build className="mr-2" />
                                        Configuración
                                    </span>
                                </Link>
                                <button onClick={handleLogoutClick} className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white w-full">
                                    <span className="flex items-center">
                                        <Logout className="mr-2" />
                                        Logout
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="flex items-center space-x-2 hover:bg-indigo-500 p-2 rounded transition duration-150">
                        <Person className="text-white" />
                        <span className="text-white">Login</span>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
