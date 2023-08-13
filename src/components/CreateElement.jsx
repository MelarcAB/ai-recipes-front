import React from 'react';

function CreateElement({ ingredient, isSelected, onToggle }) {
    return (
        <div 
             onClick={() => onToggle(ingredient.slug)} 
             className={`bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-200 hover:scale-105 cursor-pointer ${isSelected ? 'border-4 border-blue-500' : ''}`}>
            <img src={ingredient.image} alt={ingredient.name} className="w-full h-32 object-cover rounded-t-xl"/>
            <div className="p-2">
                <h2 className="text-lg font-medium mb-1">{ingredient.name_es}</h2>
                <p className="text-gray-600 text-sm">{ingredient.name}</p>
            </div>
        </div>
    );
    
}

export default CreateElement;
