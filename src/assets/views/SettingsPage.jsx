import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function SettingsPage() {
    // Obtener datos del usuario desde localStorage
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    const [userName, setUserName] = useState(storedUser.name || "");
    const [userEmail, setUserEmail] = useState(storedUser.email || "");
    const [token, setToken] = useState('');
    const { VITE_BACKEND_URL: backendURL } = import.meta.env;
    useEffect(() => {
        const hasOpenAiToken = localStorage.getItem('open_ai_token');

        //si 'open_ai_token' en el localStorage es 'true' establece un token ficticio para no mostrar nunca el token real
        if (hasOpenAiToken === 'true') {
            setToken('**************');
        }
    }, []);

    const handleTokenSubmit = async () => {
        //obtener el token JWT del localStorage
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            toast.error("No estás autenticado. Por favor, inicia sesión de nuevo.");
            return;
        }

        try {
            const response = await fetch(backendURL + '/set-openai-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ open_ai_token: token })
            });
            const data = await response.json();
            if (data.user) {
                toast.success("Token actualizado con éxito!");

                //actualizar el valor en localStorage según el valor del token
                if (token.trim() === "") {
                    localStorage.setItem('open_ai_token', 'false');
                } else {
                    localStorage.setItem('open_ai_token', 'true');
                }

            } else {
                toast.error("Error al actualizar el token.");
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado.");
            console.log(error);
        }
    };


    return (
        <div className="h-full flex flex-col items-center justify-center pt-24">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
                    Configuración
                </h2>
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                    <div className="mb-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="userName">
                            Nombre
                        </label>
                        <input className="w-full p-2 border border-gray-300 rounded-md transition duration-200 focus:border-indigo-500 focus:shadow-outline" id="userName" type="text" value={userName} readOnly />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="userEmail">
                            Email
                        </label>
                        <input className="w-full p-2 border border-gray-300 rounded-md transition duration-200 focus:border-indigo-500 focus:shadow-outline" id="userEmail" type="email" value={userEmail} readOnly />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="token">
                            Token de OpenAI
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-md transition duration-200 focus:border-indigo-500 focus:shadow-outline"
                            id="token"
                            type="password"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Introduce tu token"
                        />
                    </div>
                    <button onClick={handleTokenSubmit} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200">
                        Actualizar Token
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
