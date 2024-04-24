import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//출처: https://anerim.tistory.com/145 [디발자 뚝딱:티스토리]
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider.js';
import DefaultLayout from './components/layout/DefaultLayout.js';
import Index from './pages/Index.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Admin from './pages/Admin.js';
import User from './pages/User.js';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </DefaultLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
