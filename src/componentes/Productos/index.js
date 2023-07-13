
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../../Hooks/UseProductos";

import { serverBackEndDireccion } from '../../rutas/serverback';


const URL =`${serverBackEndDireccion()}cart/add`;


export const ProductosLista = () => {
	const { productos } = useProductos();

	const [cartItems, setCartItems] = useState([]);
	const onAddProduct =  (producto) => {
		setCartItems([...cartItems, producto]);
	}

	const enviarCarrito = async () => {
		try {
		  const response = await fetch(URL, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		  });
		  const data = await response.json();
		  console.log(data);
		} catch (error) {
		  console.error('Error al enviar el carrito:', error);
		}
	  };


	return (
		<>
			<div className="productos">{
					productos ? (
						productos.map(producto => (
							<div className="producto" key={producto.ID_Producto} >
								<Link to={`/producto/${producto.ID_Producto}`}>
									<div className="producto__img">
										<img src={producto.Imagen_1} alt="" />
									</div>
								</Link>
								<div className="producto__footer">
									<h1>{producto.Nombre_Producto}</h1>
									<p className="price">${producto.Precio} Cop</p>
								</div>
								<div className="buttoms">
									<button onClick = {() => onAddProduct(producto)} id="btn_añadirCarrito" className="btn">
										Añadir al carrito
									</button>
									<button id="btn_productoDetalles" className="btn2" onClick={() => { window.location.href = `/producto/${producto.ID_Producto}` }}>
										Vista
									</button>
								</div>
							</div>
						))
					) : (
						<p className="notificacionErrorDataProductos">Cargando productos.</p>
					)
				}
			</div >
		</>
	)
};