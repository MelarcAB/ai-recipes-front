import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const fetchData = async (url, options) => {
    const response = await fetch(url, options);

    if (response.status === 401 || response.status === 403 || response.status === 405) {
        localStorage.removeItem('token'); // Remove the invalid token
        throw new Error('Unauthorized');
    }

    const data = await response.json();
    if (!data.data) {
        throw new Error(data.message || 'Failed to fetch data');
    }

    return data;
};



const getIngredients = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No token found in localStorage");
    }

    return fetchData(`${BACKEND_URL}/ingredients`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}


const getRecipes = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No token found in localStorage");
    }


    const response = await fetch(`${BACKEND_URL}/recipes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    // Ahora estamos esperando a que la promesa se resuelva antes de intentar acceder a los datos
    const data = await response.json();
    console.log(data);

    // Cambiado "response.data" por "data.data" ya que "response" es el objeto de respuesta del fetch y no tiene la propiedad "data".
    if (!data.data) {
        throw new Error(data.message || "Failed to fetch ingredients");
    }

    return data;


}

const getRecipe = async (slug) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No token found in localStorage");
    }

    //get a /ingredients/:slug
    const response = await fetch(`${BACKEND_URL}/recipes/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const data = await response.json();

    if (!data.data) {
        return false;
    }

    return data;
}


const generateRecipe = async (ingredients_list, params) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found in localStorage");
    }
    const ingredients = ingredients_list.map(ingredient => {
        return { name: ingredient };
    });

    const response = await fetch(`${BACKEND_URL}/generate-recipe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ingredients, params })
    });

    // Ahora estamos esperando a que la promesa se resuelva antes de intentar acceder a los datos
    const data = await response.json();
    if (data.recipe) {
        return data;
    }
    return false
}




export { getIngredients, getRecipes, generateRecipe, getRecipe }
