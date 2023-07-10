import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';

import { data } from "../../context/Data"


export const ProductoDetalles = () => {

    const { id } = useParams();
    const producto = data.items.find((item) => item.id === Number(id));

    const [selectedValue, setSelectedValue] = useState(1);

    const handleInput = (e) => {
        const value = parseInt(e.target.value);
        setSelectedValue(value);
    };

    return (
        <>
            <div className="detalles">
                <h2>{producto.title}</h2>
                <p className='price'>${producto.price}</p>
                <div className='grid'>
                    <p className='nuevo'>Nuevo</p>
                    <div className='size'>
                        <select placeholder='tamano'>
                            <option value="1" >1</option>
                            <option value="1" >2</option>
                            <option value="1" >3</option>
                            <option value="1" >4</option>
                            <option value="1" >5</option>
                            <option value="1" >6</option>
                            <option value="1" >7</option>
                            <option value="1" >8</option>
                            <option value="1" >9</option>
                        </select>
                        <p>Tamaño</p>
                    </div>
                </div>

                <button id="btn_añadirCarrito" className="btn">
                    Añadir al carrito
                </button>

                <div className='contenedorImagenDetalles'>
                    <img className='imagenProductodetalles' src={producto[`img${selectedValue}`]} alt={producto.title} />
                </div>

                <input
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    value={selectedValue}
                    onChange={handleInput}
                />
                <div className='description'></div>

                <p><d>descripcion:</d> hola soy la descripcion del producto, comprame <br /> <br /> Lorem ipsum </p>
            </div>
        </>
    )
}