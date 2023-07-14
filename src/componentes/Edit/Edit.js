// Importamos los paquetes necesarios
import React from "react";
import "./Edit.css";
import { ProductsAdmin } from "./EditIndex";

// Creamos el componente EditProduct
export default function EditProduct(){
    // Renderizamos el componente
    return(
        // Establecemos un div que contendrá nuestra tabla
        <div className="editTableContainer">
            
            <div className="table">
              
                <div id="tableTitle">
                    <p>Id</p> 
                    <p>Image</p> 
                    <p>Nombre</p> 
                    <p>Precio</p> 
                    <p>Stock max</p> 
                    <p>Stock min</p> 
                    <p>Stock</p> 
                </div>
                
                <ProductsAdmin></ProductsAdmin>
            </div>
        </div>
    )
}
