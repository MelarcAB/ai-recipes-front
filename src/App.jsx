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
import { AuthProvider } from './context/AuthContext';
import SettingsPage from './assets/views/SettingsPage';
import CreatePage from './assets/views/CreatePage';

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
              <LoginForm setForceUpdate={setForceUpdate} />
            } />
            <Route path="/register" element={
              <RegisterForm />
            } />
            <Route path="/home" element={<PrivateRoute />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/settings" element={<PrivateRoute />}>
              <Route index element={<SettingsPage />} />
            </Route>
            <Route path="/create-recipe" element={<PrivateRoute />}>
              <Route index element={<CreatePage />} />
            </Route>
            <Route path="/" element={<RedirectBasedOnAuth />} />
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

