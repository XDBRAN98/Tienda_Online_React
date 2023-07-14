import React from "react";
import "./Success.css"
import { GrValidate } from 'react-icons/gr';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
 

//funcion que extrae la data del localstorage y la guarda en un objeto a la ruta de la api
 function postOrder(){
    const clienteId = JSON.parse(localStorage.getItem('user'));
    const URL = `http://localhost:5000/success`;
    const data = {
        email: clienteId.Email,
  
    };
    console.log(data);
    localStorage.setItem('order', JSON.stringify(data));
    //esperar 10 segundos para que se envie la orden
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

        .then(response => response.json())
        .then(data => {
            console.log('Orden enviada:', data);
            // Aquí puedes manejar la respuesta del servidor después de actualizar el producto
        })
        .catch(error => {
            console.error('Error al enviar la orden:', error);
        });
}


function Success(){
    return(
        <div className="successContainer">
            <div className="Success"><GrValidate className="validate"/></div>
            <h1>Compra realizada correctamente <BsFillHandThumbsUpFill className="hand"/></h1>
            <a href="/" onClick={postOrder}> Volver al inicio <BsFillArrowLeftCircleFill className="return"/></a>
        </div>
    )
}


export default Success;