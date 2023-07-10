import React from "react";
import { BrowserRouter } from "react-router-dom";
import 'boxicons';


import { Header } from "./componentes/Header";
import { Paginas } from "./rutas/paginas"
import { Carrito } from "./componentes/Carrito";


function App() {
	return (
			<div className="App">

				<BrowserRouter>
					<Header />
					<Paginas />
				</BrowserRouter>
			</div>
	);
}

export default App;
