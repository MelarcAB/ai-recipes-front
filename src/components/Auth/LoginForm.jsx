import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link si usas react-router
import { useNavigate } from 'react-router-dom';
const LoginForm = ({ setForceUpdate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { VITE_BACKEND_URL: backendURL } = import.meta.env;
    const navigation = useNavigate();

    //si user esta logeado, redirigir a home
    if (localStorage.getItem('token')) {
        navigation('/home');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mostrar un toast con mensaje "Cargando..." y guardar su referencia
        const toastId = toast("Cargando...", { autoClose: false });

        try {
            const response = await fetch(backendURL + "/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            // Cerrar el toast "Cargando..."
            toast.dismiss(toastId);

            const data = await response.json();

            if (data.user) {
                toast.success('Inicio de sesión exitoso.');
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                //go to home
                navigation('/home');

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.dismiss(toastId);

            toast.error('Hubo un problema al intentar conectar con el servidor.');
        }
    };

    return (
        <div className="h-full flex items-center justify-center pt-24">
            <div className="w-full max-w-xs">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-indigo-600">
                        Bienvenido
                    </h2>
                    <p className="text-gray-800">Inicia sesión para generar recetas</p>
                </div>
                <form className="bg-white border border-gray-200 rounded-lg shadow-md p-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
                            Email
                        </label>
                        <input className="w-full p-2 border border-gray-300 rounded-md transition duration-200 focus:border-indigo-500 focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Tu email" required />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">
                            Contraseña
                        </label>
                        <input className="w-full p-2 border border-gray-300 rounded-md transition duration-200 focus:border-indigo-500 focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" required />
                    </div>
                    <div className="mt-2">
                        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200" type="submit">
                            Iniciar sesión
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-gray-800">¿No tienes cuenta? <Link to="/register" className="text-indigo-600 hover:underline">Regístrate aquí</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default LoginForm;
