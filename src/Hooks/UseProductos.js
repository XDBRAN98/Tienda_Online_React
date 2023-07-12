/* import { data } from "../context/Data"

function useProductos() {
    const getProductos = async () => {
        
        //fetch("https://bootcamp-v13j.onrender.com/products").then(response=>response.json()).then(data=>data)

        return data.productos

        console.log(data);
    }

    return{getProductos}
}

export {useProductos}

*/

import { useState, useEffect } from 'react';
import axios from 'axios';

function useProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response =  axios.get('http://192.168.20.27:5000/products');
        const data = response.data.productos;
        console.log(data)
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return { productos };
}

export { useProductos };
