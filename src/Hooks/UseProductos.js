


const URL = 'https://bootcamp-v13j.onrender.com/products';
//const URL ='http://192.168.20.27:5000/products/';



import { useState, useEffect } from 'react';

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