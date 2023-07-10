import React, { useContext } from 'react';
import { DataContext } from '../../Hooks/DataProvider';

export const Carrito = () => {
    const { carrito } = useContext(DataContext);

    return (
        <div>
            {carrito.map(producto => (
                <div key={producto.id}>
                    <h2>{producto.title}</h2>
                    <p>{producto.category}</p>
                    <p className="price">${producto.price} Cop</p>
                    {/* Aquí puedes añadir botones para modificar la cantidad y remover productos */}
                </div>
            ))}
        </div>
    );
};
