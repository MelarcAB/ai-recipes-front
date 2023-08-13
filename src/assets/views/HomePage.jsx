import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-auto py-20">
            <h1 className="text-4xl font-bold text-indigo-700 mb-10">Home Page</h1>

            <div className="space-y-6 w-full max-w-md">
                <Link to="/view-recipes" className="block w-full">
                    <div className="bg-white border border-gray-200 p-6 rounded-lg transition-transform transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className="text-2xl font-semibold text-gray-800">Ver recetas</span>
                            </div>
                            <span className="text-indigo-500 hover:text-indigo-600 transition-colors duration-200">&#x2192;</span> {/* Flecha derecha */}
                        </div>
                    </div>
                </Link>

                <Link to="/create-recipe" className="block w-full">
                    <div className="bg-white border border-gray-200 p-6 rounded-lg transition-transform transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className="text-2xl font-semibold text-gray-800">Crear recetas</span>
                            </div>
                            <span className="text-indigo-500 hover:text-indigo-600 transition-colors duration-200">&#x2192;</span> {/* Flecha derecha */}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
