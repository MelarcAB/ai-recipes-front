import React, { useState, useEffect } from 'react';
import { getRecipes } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';

function RecipeElement({ recipe }) {
    return (
        <Link to={`/recipe/${recipe.slug}`} className="block text-decoration-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out">
                <h2 className="text-xl font-bold mb-2 text-blue-700">{recipe.name}</h2>
                <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-md font-semibold mb-2 text-blue-600">Ingredientes:</h3>
                <p className="bg-blue-100 p-2 rounded-lg text-sm text-blue-600 break-words">{recipe.quantity}</p>
            </div>
        </Link>
    );
}


function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();  // Inicializando el hook

    useEffect(() => {
        getRecipes().then(response => {
            setRecipes(response.data);
        }).catch(error => {
            console.error("Error fetching recipes:", error);
        });
    }, []);

    return (
        <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-400">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-extrabold text-white">Recetas</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate('/home')}
                        className="inline-flex items-center text-white hover:text-indigo-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="ml-1">Inicio</span>
                    </button>

                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {recipes.map(recipe => (
                    <RecipeElement key={recipe.slug} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}



export default RecipesPage;
