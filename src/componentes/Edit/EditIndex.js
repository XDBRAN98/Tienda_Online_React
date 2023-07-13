
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../../Hooks/UseProductos";

export const ProductsAdmin = () => {

    const { productos } = useProductos();

    return (
        <div className="productContainerFromTable">

            {productos.map(producto => (
                <div className="tableElemet" key={producto.ID_Producto}>
                    <Link className="tableElemetLink" to={`#`} >
                        <div className="tableElemetId">{producto.ID_Producto}</div>
                        <div className="tableElementImage">
                            <img src={producto.Imagen_1} alt="" />
                        </div>
                        <div className="tableElemetName">{producto.Nombre_Producto}</div>
                        <div className="tableElemetPrice">${producto.Precio} Cop</div>
                        <div className="tableElemetMax">{producto.Max}</div>
                        <div className="tableElemetMin">{producto.Min}</div>
                        <div className="tableElemetStock">{producto.Stock}</div>
                    </Link>
                </div>
            ))}
        </div>
    )
};