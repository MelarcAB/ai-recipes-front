import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIngredients, generateRecipe } from '../../api/api';
import CreateElement from '../../components/CreateElement';
import LoadingRecipe from '../../components/LoadingRecipe';
function CreatePage() {
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [recipeGenerated, setRecipeGenerated] = useState(false);
    const [recipeSlug, setRecipeSlug] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        getIngredients().then(response => {
            setIngredients(response.data);
        }).catch(error => {
            console.error("Error fetching ingredients:", error);
        });
    }, []);

    const toggleIngredient = (slug) => {
        if (selectedIngredients.includes(slug)) {
            setSelectedIngredients(prev => prev.filter(item => item !== slug));
        } else {
            setSelectedIngredients(prev => [...prev, slug]);
        }
    };

    const handleGenerateRecipe = async () => {
        setModalOpen(true);
        try {
            const response = await generateRecipe(selectedIngredients);
            if (response.recipe) {
                setRecipeGenerated(true);
                setRecipeSlug(response.recipe.slug);
                setTimeout(() => {
                    navigate(`/recipe/${response.recipe.slug}`);
                }, 3000);
            } else {
                throw new Error("No recipe received.");
            }
        } catch (error) {
            setErrorMessage("Hubo un error al generar la receta. Por favor, inténtalo de nuevo.");
            console.error("Error generating recipe:", error);
            setTimeout(() => {
                setModalOpen(false);
            }, 5000);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Ingredientes</h1>
            <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-grow grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
                    {ingredients.map(ingredient => (
                        <CreateElement
                            key={ingredient.slug}
                            ingredient={ingredient}
                            isSelected={selectedIngredients.includes(ingredient.slug)}
                            onToggle={toggleIngredient}
                        />
                    ))}
                </div>
                <div className="md:w-1/4 sticky top-0">
                    <h2 className="text-2xl font-bold mb-4">Seleccionados:</h2>
                    <ul className="bg-gray-100 p-4 rounded shadow mb-4">
                        {selectedIngredients.map(slug => {
                            const ingredient = ingredients.find(ing => ing.slug === slug);
                            return (
                                <li key={slug} className="border-b py-2 flex items-center">
                                    <img
                                        src={ingredient.image}
                                        alt={ingredient.name_es}
                                        className="w-6 h-6 mr-2"
                                    />
                                    {ingredient.name_es}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-xl">
                        {!recipeGenerated && !errorMessage ? (
                            <>
                                <LoadingRecipe />
                                <p className="mt-4 text-center">Generando receta...</p>
                            </>
                        ) : errorMessage ? (
                            <p className="mt-4 text-center text-red-500">{errorMessage}</p>
                        ) : (
                            <>
                                <p className="mt-4 text-center text-2xl">¡Ya está!</p>
                                <p className="mt-4 text-center text-sm">Redirigiendo a la receta...</p>

                            </>
                        )}
                    </div>
                </div>
            )}
            <button onClick={handleGenerateRecipe} className="fixed bottom-8 right-8 bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition">
                <span className="flex items-center justify-center text-lg">Generar</span>
            </button>

        </div>
    );
}

export default CreatePage;
