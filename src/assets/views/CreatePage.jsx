import React, { useState, useEffect } from 'react';
import { getIngredients } from '../../api/api';
import CreateElement from '../../components/CreateElement';

function CreatePage() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

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
    }

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
                <div className="md:w-1/4">
                    <h2 className="text-2xl font-bold mb-4">Seleccionados:</h2>
                    <ul className="bg-gray-100 p-4 rounded shadow mb-4">
                        {selectedIngredients.map(slug => (
                            <li key={slug} className="border-b py-2">{slug}</li>
                        ))}
                    </ul>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 shadow">
                        Generar receta
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePage;
