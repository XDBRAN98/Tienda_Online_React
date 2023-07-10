import React, { createContext, useState, useEffect } from "react";
import Data from "../context/Data";

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const producto = Data.items 
        if (producto) {
            setProductos(producto);
        } else {
            setProductos([]);
        }
    }, []);

    const addCarrito = (id) => {
        const check = carrito.every(item => {
            return item.id !== id;
        });
        if (check) {
            const data = productos.filter(producto => {
                return producto.id === id;
            });
            setCarrito([...carrito, ...data]);
        } else {
            alert("El producto se ha añadido al carrito");
        }
    };

    const removeCarrito = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    useEffect(() => {
        localStorage.setItem('dataCarrito', JSON.stringify(carrito));
        const total = carrito.reduce((prev, item) => {
            return prev + item.price;
        }, 0);
        setTotal(total);
    }, [carrito]);

    return (
        <DataContext.Provider value={{ productos, carrito, addCarrito, removeCarrito, total }}>
            {props.children}
        </DataContext.Provider>
    );
};
