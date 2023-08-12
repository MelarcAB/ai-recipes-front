import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { VITE_BACKEND_URL: backendURL } = import.meta.env;
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch(backendURL + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token) {
            toast.success('Inicio de sesión exitoso.');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            toast.error(data.message);
        }

    };

    return (
        <div className="h-full flex items-center justify-center bg-white pt-24">
            <div className="w-full max-w-xs">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-600">
                        Bienvenido
                    </h2>
                    <p className="text-gray-600">Inicia sesión para generar recetas</p>
                </div>
                <form className="bg-white rounded-lg shadow-md p-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                            Email
                        </label>
                        <input className="w-full p-2 border rounded-md transition duration-200 focus:border-blue-500 focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Tu email" required />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
                            Contraseña
                        </label>
                        <input className="w-full p-2 border rounded-md transition duration-200 focus:border-blue-500 focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" required />
                    </div>
                    <div className="mt-2">
                        <button className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200" type="submit">
                            Iniciar sesión
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default LoginForm;
