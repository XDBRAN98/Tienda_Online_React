
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'http://192.168.20.27:5000/products';

function useProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(URL);
        const data = response.data;

        if (data && Array.isArray(data.productos)) {
          setProductos(data.productos);
        } else {
          console.error('La respuesta de la API no es válida:', data);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return { productos };
}

export { useProductos };
