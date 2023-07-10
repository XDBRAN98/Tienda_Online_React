import React from 'react';
import { Routes, Route } from "react-router-dom";

import { ProductosLista } from "../componentes/Productos/index"
import { ProductoDetalles } from '../componentes/Productos/ProductoDetalles'

export const Paginas = () => {
    return (
    <section>
        <Routes>
            <Route path="/" element={<ProductosLista/>}/>
            // <Route path="producto/:id" element={<ProductoDetalles/>}/>

        </Routes>
    </section>
    )
}