import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { VITE_BACKEND_URL: backendURL } = import.meta.env;

    const registerUser = async (userDetails) => {
        const response = await fetch(backendURL + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            console.log(data);
            toast.dismiss(toastId);

            if (data.success) {
                toast.success('Registro exitoso. Por favor inicia sesión.');
            } else {
                toast.error(data.message || 'Error al registrar.');
            }

        } catch (error) {
            toast.dismiss(toastId);
            console.log(error);

            toast.error('Hubo un problema al intentar conectar con el servidor.');
        }
    };

    return (
        <div className="h-full flex items-center justify-center bg-white pt-24">
            <div className="w-full max-w-xs">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-600">
                        Regístrate
                    </h2>
                    <p className="text-gray-600">Crea una cuenta para generar recetas</p>
                </div>
                <form className="bg-white rounded-lg shadow-md p-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                            Nombre
                        </label>
                        <input className="w-full p-2 border rounded-md transition duration-200 focus:border-blue-500 focus:shadow-outline" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />
                    </div>
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
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
