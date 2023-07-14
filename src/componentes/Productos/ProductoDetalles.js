import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductos } from '../../Hooks/UseProductos';
import { serverBackEndDireccion } from '../../rutas/serverback';

//extraer del local storage el id del cliente
const cliente = JSON.parse(localStorage.getItem('user'));
const URL =`${serverBackEndDireccion()}cart/add`;


export const ProductoDetalles = () => {

    const { id } = useParams();
    const { productos } = useProductos();
    const producto = productos.find((item) => item.ID_Producto === Number(id));

    const [selectedValue, setSelectedValue] = useState(1);
  
	const [cartItems, setCartItems] = useState([]);
  
	const onAddProduct = (producto) => {
			setCartItems([...cartItems, producto]);
			sendToCart(producto, cliente.ID_Usuario);
	};
  
	const sendToCart = async (producto, clienteId) => {
		try {
		  const data = {
			clienteId: clienteId,
			productoId: producto.ID_Producto,
			cantidad:1
		  };
		  console.log(data);
	  
		  const response = await fetch(URL, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		  });
	  
		  const responseData = await response.json();
		  console.log(responseData);
		} catch (error) {
		  console.error('Error al enviar el carrito:', error);
		}
	  };

	  const handleAddToCart = (producto) => {
        if (cliente) {
            onAddProduct(producto);
        } else {
            // Redirect to login view
            window.location.href = '/login';
        }
    };
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

                        <button 
                        onClick={() => handleAddToCart(producto)}
                        id="btn_añadirCarrito"
                        className="btn">
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