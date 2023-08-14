const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getIngredients = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No token found in localStorage");
    }

    const response = await fetch(`${BACKEND_URL}/ingredients`, {
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

export { getIngredients }
