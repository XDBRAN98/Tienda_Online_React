import React from "react";
import "./Success.css"
import { GrValidate } from 'react-icons/gr';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';


function Success(){
    return(
        <div className="successContainer">
            <div className="Success"><GrValidate className="validate"/></div>
            <h1>Compra realizada correctamente <BsFillHandThumbsUpFill className="hand"/></h1>
            <a href="/">Volver al inicio <BsFillArrowLeftCircleFill className="return"/></a>
        </div>
    )
}


export default Success;