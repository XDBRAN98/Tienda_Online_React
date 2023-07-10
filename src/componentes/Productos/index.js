
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useProductos } from "../../Hooks/UseProductos";


export const ProductosLista = () => {

	const productosService = useProductos()

	const [productos, setProductos] = useState([])

	useEffect(() => {
		productosService.getProductos().then(data => {
			setProductos(data)
		})
	}, [])

	return (
		<>
			<div className="productos">

				{productos.map(producto => (

					<div className="producto" key={producto.id}>
						<Link to= {`/producto/${producto.id}`}>
							<div className="producto__img">
								<img src={producto.img1} alt="" />
							</div>
						</Link>
						<div className="producto__footer">
							<h1>{producto.title}</h1>
							<p>{producto.category}</p>
							<p className="price">${producto.price} Cop</p>
						</div>
						<div className="buttoms">

							<button id="btn_añadirCarrito" className="btn">
								Añadir al carrito
							</button>

								<button id="btn_productoDetalles" className="btn2" onClick={()=>{ window.location.href = `/producto/${producto.id}`}}>
									Vista
								</button>
						</div>
					</div>
				))}

			</div>
		</>
	)
};