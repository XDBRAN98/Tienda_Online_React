import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Home } from '../paginas/Home/index';
import LoginForm from '../paginas/auth/login';
import RegistrationForm from '../paginas/auth/register';
export const Paginas = () => {
    return (
    <section>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/register" element={<RegistrationForm/>}/>
        </Routes>
    </section>
    )
}