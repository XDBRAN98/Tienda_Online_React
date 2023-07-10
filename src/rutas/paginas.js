import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Home } from '../paginas/Home/index';
import LoginForm from '../paginas/auth/login';
import RegistrationForm from '../paginas/auth/register';
import { ProductosLista } from "../componentes/Productos/index"
import { ProductoDetalles } from '../componentes/Productos/ProductoDetalles'

export const Paginas = () => {
    return (
    <section>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/register" element={<RegistrationForm/>}/>
            <Route path="/" element={<ProductosLista/>}/>
            // <Route path="producto/:id" element={<ProductoDetalles/>}/>

        </Routes>
    </section>
    )
}