import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./componentes/Header";
import { Paginas } from "./rutas/paginas"
import { Carrito } from "./paginas/carrito/cart";
import Footer from "./componentes/Footer/Footer";


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Paginas />
				<Footer/>
			</BrowserRouter>
		</div>
	);
}

export default App;
