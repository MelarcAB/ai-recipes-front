import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/Auth/LoginForm';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import dotenv from 'dotenv';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}