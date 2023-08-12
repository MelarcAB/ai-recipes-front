
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/Auth/LoginForm';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <Router>

      <Navbar />
      <ToastContainer />

      <div className="App mt-10">
        <Routes>
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}