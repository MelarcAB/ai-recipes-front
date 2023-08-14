import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipe } from "../../api/api.jsx";

function RecipePage() {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await getRecipe(slug);
                if (response && response.data) {
                    setRecipe(response.data);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        }

        fetchRecipe();
    }, [slug]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="mx-auto max-w-2xl mt-8 p-4 md:px-8">
            <button
                onClick={() => navigate('/view-recipes')}
                className="mb-4 inline-flex items-center text-indigo-600 hover:text-indigo-700"
            >
                <svg className="w-6 h-6 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Volver a recetas
            </button>

            <div className="rounded-xl overflow-hidden shadow-lg">
                <img src={recipe.image} alt={recipe.name} className="w-full h-56 object-cover object-center" />
                <div className="bg-white p-6 rounded-b-xl">
                    <h1 className="text-2xl font-bold mb-4 text-indigo-600">{recipe.name}</h1>
                    <p className="text-sm mb-4 text-gray-500">{recipe.quantity}</p>
                    <ol className="list-decimal pl-5 mb-4 bg-indigo-100 p-4 rounded-lg">
                        {recipe.steps.map((stepObj, index) => (
                            <li key={index} className="mb-3 text-gray-700 flex items-start">
                                <span className="text-indigo-500 mr-2">•</span>
                                {stepObj.step}
                            </li>
                        ))}
                    </ol>
                    <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                        Generar alternativa (próximamente)
                    </button>
                </div>
            </div>
        </div>
    );

}

export default RecipePage;
