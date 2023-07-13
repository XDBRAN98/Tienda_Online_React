import React from "react";
import './Modal.css'

const Modal = ({ selectedProduct, setIsModalOpen }) => {
    return (
        <div className="PrincipalContainerModal">
            <div className="modal">
                <div className="modalLeft">
                    <h1 className="modalTitle">Actualizar información de un producto</h1>
                    <p>Nombre: </p>
                    <input type="text" defaultValue={selectedProduct.Nombre_Producto}></input>
                    <p>Precio: </p>
                    <input type="text" defaultValue={selectedProduct.Precio}></input>
                    <p>Stock Maximo: </p>
                    <input type="text" defaultValue={selectedProduct.Max}></input>
                    <p>Stock Maximo: </p>
                    <input type="text" defaultValue={selectedProduct.Nombre_Producto}></input>
                    <p>Stock: </p>
                    <input type="text" defaultValue={selectedProduct.Min}></input>
                </div>
                <div className="modalRight">
                    <img src={selectedProduct.Imagen_1} ></img>
                    <button id="applyChanges" onClick={() => {
                        console.log("Funciona")
                    }}> Aplicar Cambios
                    </button>
                    <button className="cerrarModal" onClick={()=>{
                        setIsModalOpen(false);
                    }}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
