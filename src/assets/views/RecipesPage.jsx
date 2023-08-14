import React, { useState, useEffect } from 'react';
import { getRecipes } from '../../api/api';

function RecipeElement({ recipe }) {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out">
            <h2 className="text-xl font-bold mb-2 text-blue-700">{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-md font-semibold mb-2 text-blue-600">Ingredientes:</h3>
            <pre className="bg-blue-100 p-2 rounded-lg text-sm text-blue-600">{recipe.quantity}</pre>
        </div>
    );
}


function RecipesPage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes().then(response => {
            setRecipes(response.data);
        }).catch(error => {
            console.error("Error fetching recipes:", error);
        });
    }, []);

    return (
        <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-400">
            <h1 className="text-4xl font-extrabold mb-6 text-white">Recetas</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {recipes.map(recipe => (
                    <RecipeElement key={recipe.slug} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}


export default RecipesPage;
