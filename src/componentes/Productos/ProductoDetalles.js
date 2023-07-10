import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';

import { data } from "../../context/Data"


export const ProductoDetalles = () => {

    const { id } = useParams();
    const producto = data.items.find((item) => item.id === Number(id));


    return (
        <>
            <div className="detalles">
                <h2>{producto.title}</h2>
                <p className="price">${producto.price}</p>
                <div className="grid">
                    
                </div>

            </div>
        </>
    )


















}