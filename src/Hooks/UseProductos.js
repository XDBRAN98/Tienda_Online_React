import { useState, useEffect } from 'react';
import { serverBackEndDireccion } from '../rutas/serverback';


const URL =`${serverBackEndDireccion()}products/`;


function useProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setProductos(data.productos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return { productos };
}

export { useProductos };