import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Home } from '../paginas/Home/index';

export const Paginas = () => {
    return (
    <section>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </section>
    )
}