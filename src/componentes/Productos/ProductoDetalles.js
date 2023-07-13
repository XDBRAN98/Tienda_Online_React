import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductos } from '../../Hooks/UseProductos';

export const ProductoDetalles = () => {

    const { id } = useParams();
    const { productos } = useProductos();
    const producto = productos.find((item) => item.ID_Producto === Number(id));

    const [selectedValue, setSelectedValue] = useState(1);

    const handleInput = (e) => {
        const value = parseInt(e.target.value);
        setSelectedValue(value);
    };

    useEffect(() => {
        if (producto) {
            setSelectedValue(1);
        }
    }, [producto]);

    return (
        <>
            {producto ? (
                <div className="detalles">
                    <h2>{producto.Nombre_Producto}</h2>

                    <div className="contenedorImagenDetalles">
                        <img
                            className="imagenProductodetalles"
                            src={producto[`Imagen_${selectedValue}`]}
                            alt={producto.Nombre_Producto}
                        />
                    </div>

                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={1}
                        value={selectedValue}
                        onChange={handleInput}
                    />

                    <div className='contenedorPrecioBtcarrito'>

                        <p className="price">$ {producto.Precio} Cop</p>

                        <button id="btn_añadirCarrito" className="btn">
                            Añadir al carrito
                        </button>

                    </div>

                    <div className='contenedorDescripcion'>
                        <p className='detallesDescripcion'>
                            <span className='description'>Descripción: </span>
                            {producto.Descripcion}
                        </p>
                    </div>

                </div>
            ) : (
                <p className='notificacionErrorDataProducto'>Cargando producto.</p>
            )}
        </>
    );
};