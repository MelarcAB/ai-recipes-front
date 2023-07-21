import React from 'react';
import { Link } from 'react-router-dom';

import { Home, Search, RestaurantMenu, Person } from '@mui/icons-material'
import '@fontsource/press-start-2p';
import '@fontsource/roboto';
import '@fontsource/poppins';


const links = [
    // { icon: <Search />, label: 'Search' },
    // { icon: <Home />, label: 'Home' },
    { icon: <Person />, label: 'Login' },
];

const NavLink = ({ icon, label }) => (
    <span className="material-symbols-outlined flex items-center cursor-pointer gap-2 text-white text-sm py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
        {icon}
        <span>{label}</span>
    </span>
);


const Navbar = () => {
    const { VITE_APP_NAME: appName } = import.meta.env;
    const title_color = "white";
    return (
        <nav className="bg-slate-500 h-14 w-screen fixed top-0 left-0 flex justify-between items-center px-4">
            <Link to="/" className="flex items-center space-x-2">
                <RestaurantMenu className="text-2xl text-white" />
                <span className='text-2xl text-white font-poppins'>{appName}</span>
            </Link>
            <div className="flex items-center space-x-4">
                {links.map((link, index) => (
                    <NavLink key={index} icon={link.icon} label={link.label} />
                ))}
            </div>
        </nav>
    );

};


export default Navbar;
