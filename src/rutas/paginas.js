import React from 'react';
import { Routes, Route } from "react-router-dom";
import { autenticacionGuard ,adminGuard} from '../guards/guard';


import LoginForm from '../paginas/auth/login';
import RegistrationForm from '../paginas/auth/register';
import AdminProfileForm from '../paginas/profile/profile';
import { ProductosLista } from "../componentes/Productos/index"
import { ProductoDetalles } from '../componentes/Productos/ProductoDetalles'

import  Cart  from '../paginas/carrito/cart';
export const Paginas = () => {
    return (
        <section>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/" element={<ProductosLista />} />y
                <Route path="/profile" element={adminGuard(<AdminProfileForm />)} />
                <Route path="producto/:id" element={<ProductoDetalles />} />
                <Route path="/cart" element={autenticacionGuard(<Cart />)} />

            <Route
          path="/cart"
          element={autenticacionGuard(<Cart />)}
        />
        </Routes>
    </section>
    )
}