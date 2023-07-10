import React, { useEffect, useState } from "react";

import { useProductos } from "../../Hooks/UseProductos";


export const ProductosLista = () => {

	const productosService = useProductos()

	const [productos, setProductos] = useState([])

	useEffect(() => {
		productosService.getProductos().then(data => {
			setProductos(data)
		})
	}, [	
		productosService
	])

	return (
		<>
			<div className="productos">

				{productos.map(producto => (

					<div className="producto" key={producto.id}>
						<a href=" ">
							<div className="producto__img">
								<img src={producto.image} alt="" />
							</div>
						</a>
						<div className="producto__footer">
							<h1>{producto.title}</h1>
							<p>{producto.category}</p>
							<p className="price">${producto.price} Cop</p>
						</div>
						<div className="buttoms">
							<button className="btn">
								Añadir al carrito
							</button>

							<button className="btn2">
								Vista
							</button>

						</div>
					</div>
				))}


			</div>
		</>
	)
};