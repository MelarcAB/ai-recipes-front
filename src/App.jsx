import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import HomePage from './assets/views/HomePage';
import PrivateRoute from './components/ProtectedRoutes/PrivateRoute';
import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'typeface-inter';
import useAuth from './hooks/useAuth';
import { Navigate, Route } from 'react-router';
import { AuthProvider } from './context/authContext';

export default function App() {
  const [forceUpdate, setForceUpdate] = useState(false);

  return (
    <>
      <AuthProvider>
        <Navbar />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
        ></ToastContainer>

        <div className="App mt-10">
          <Routes>
            <Route path="/login" element={
              <LoginForm setForceUpdate={setForceUpdate} />  // Pasamos una función para forzar el update
            } />
            <Route path="/register" element={
              <RegisterForm />
            } />
            <Route path="/home" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } />
            <Route path="/" element={<RedirectBasedOnAuth />} />  // Nuevo componente para manejar la redirección
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

// Nuevo componente para manejar la redirección en base a la autenticación
function RedirectBasedOnAuth() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />;
}

