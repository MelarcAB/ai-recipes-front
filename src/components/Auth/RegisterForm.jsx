import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { VITE_BACKEND_URL: backendURL } = import.meta.env;
    const navigation = useNavigate();


    const registerUser = async (userDetails) => {
        const response = await fetch(backendURL + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userDetails)
        });

        return response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast("Registrando...", { autoClose: false });

        try {
            const data = await registerUser({ name, email, password });
            toast.dismiss(toastId);

            if (data.user) {
                toast.success('Registro exitoso. Por favor inicia sesión.');
                navigation('/login');


            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.dismiss(toastId);

        }
    };

    return (
        <div className="h-full flex items-center justify-center  pt-24">
            <div className="w-full max-w-xs">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-indigo-600">
                        Regístrate
                    </h2>
                    <p className="text-gray-800">Crea una cuenta para generar recetas</p>
                </div>
                <form className="bg-white border border-gray-200 rounded-lg shadow-md p-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">
                            Nombre
                        </label>
                        <input className="w-full p-2 border border-gray-300 rounded-md transition duration-200 focus:border-indigo-500 focus:shadow-outline" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />
                    </div>
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
                        <button className="w-full bg-indigo-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200" type="submit">
                            Registrarse
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-gray-800">¿Ya tienes cuenta? <Link to="/login" className="text-indigo-600 hover:underline">Inicia sesión aquí</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
