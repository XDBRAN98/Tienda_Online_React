
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useProductos } from "../../Hooks/UseProductos";


export const ProductosLista = () => {

	const productosService = useProductos()

	const [productos, setProductos] = useState([])

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const data = await productosService.getProductos();

			if (Array.isArray(data)) {
			  setProductos(data);
			} 
			else {
			  console.error("La respuesta de la API no es un array válido");

			}
		  } 
		  catch (error) {
			console.error("Error al obtener los productos:", error);
		  }
		};
	
		fetchData();
	  }, [productosService]);

	return (
		<>
			<div className="productos">

				{productos.map(producto => (

					<div className="producto" key={producto.ID_Producto}>
						<Link to= {`/producto/${producto.ID_Producto}`}>
							<div className="producto__img">
								<img src={producto.Imagen_1} alt="" />
							</div>
						</Link>
						<div className="producto__footer">
							<h1>{producto.Nombre_Producto}</h1>
							<p className="price">${producto.Precio} Cop</p>
						</div>
						<div className="buttoms">

							<button id="btn_añadirCarrito" className="btn">
								Añadir al carrito
							</button>

								<button id="btn_productoDetalles" className="btn2" onClick={()=>{ window.location.href = `/producto/${producto.ID_Producto}`}}>
									Vista
								</button>
						</div>
					</div>
				))}

			</div>
		</>
	)
};