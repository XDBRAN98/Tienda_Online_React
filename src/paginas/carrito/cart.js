import React, { useState, useEffect } from 'react';
import './cart.css';
import ImageEmpty from '../../acces/pngwing.com.png';
import axios from 'axios';
import { serverBackEndDireccion } from '../../rutas/serverback';
const Cart = () => {
  const [items, setItems] = useState([]);
  const clienteId = JSON.parse(localStorage.getItem('user'))?.ID_Usuario;
  const URL = `${serverBackEndDireccion()}cart/add`;
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (clienteId) {
          const response = await fetch(`http://localhost:5000/carrito/${clienteId}`);
          const data = await response.json();

          // Asegurarse de que la respuesta contenga la propiedad 'productos'
          if (data && data.productos) {
            setItems(data.productos);
          } else {
            setItems([]); // Establecer el carrito como vacío si no hay productos
          }
        }
      } catch (error) {
        console.error('Error al obtener los artículos del carrito:', error);
      }
    };

    fetchCartItems();
  }, [clienteId]);

  const addItemToCart = async (item) => {
    const updatedItems = [...items];
    const existingItemIndex = updatedItems.findIndex(
      (i) => i.producto.ID_Producto === item.producto.ID_Producto
    );
  
    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, increase the quantity
      updatedItems[existingItemIndex].producto.Cantidad += 1;
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      updatedItems.push({ producto: { ...item.producto, Cantidad: 1 }, subtotal: item.subtotal });
    }
  
    setItems(updatedItems);
  
    try {
      // Prepare the data to be sent to the backend
      const data = {
        clienteId: clienteId,
        productoId: item.producto.ID_Producto,
        cantidad: 1, // For adding a new item, send a quantity of 1
      };
      
      // Make a POST request to the backend API
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      // Handle the response from the backend if needed
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error al enviar el carrito:', error);
      // If there's an error, you might want to handle it appropriately
    }
  };
  
  const handleButtonPress = async () => {
    const formData = {
      line_items: [
        {
          price_data: {
            product_data: {
              name: 'Carrito de productos',
              description: 'Cobro por productos en el carrito',
            },
            currency: 'usd',
            unit_amount: calculateSubtotal(), // Se debe proporcionar un valor correcto aquí
          },
          quantity: 1,
        },
      ],
    };

    try {
      const res = await axios.post('http://localhost:5000/checkout', formData);
      if (res.data.result) {
        window.location.href = res.data.result.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseItemQuantity = async (index) => {
    const updatedItems = [...items];
    
    if (updatedItems[index].producto.Cantidad > 1) {
      // Reduce the quantity in the client-side data
      updatedItems[index].producto.Cantidad -= 1;
      setItems(updatedItems);
  
      try {
        // Prepare the data to be sent to the backend
        const data = {
          clienteId: clienteId,
          productoId: updatedItems[index].producto.ID_Producto,
          cantidad: -1, // Reduce the quantity by 1 on the server-side
        };
        
        // Make a POST request to the backend API
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        // Handle the response from the backend if needed
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error('Error al enviar el carrito:', error);
        // If there's an error, you might want to revert the change on the client-side
        // updatedItems[index].producto.Cantidad += 1;
        // setItems(updatedItems);
      }
    }
  };
  

  const deleteItemFromCart = async (index) => {
    const productoId = items[index].producto.ID_Producto;
    console.log(productoId);
    try {
      await axios.delete(`http://localhost:5000/carrito/${clienteId}/${productoId}`);
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.subtotal;
    });
    return subtotal;
  };

  return (
    <div className="cart">
      {items.length === 0 ? (
        <div className="cart__empty">
          <img src={ImageEmpty} alt="Carrito vacío" />
          <p>No hay artículos en el carrito.</p>
        </div>
      ) : (
        <>
          <ul className="cart__list">
            {items.map((item, index) => (
              <li key={index} className="cart__item">
                <div className="cart__item-thumbnail">
                  <img src={item.producto.Imagen_1} alt="Producto" />
                </div>
                <div className="cart__item-info">
                  <div className="cart__item-details">
                    <label className="cart__item-name">{item.producto.Nombre_Producto}</label>
                    <button className="cart__item-remove" onClick={() => deleteItemFromCart(index)}>
                      Eliminar
                    </button>
                  </div>
                  <div className="cart__item-quantity">
                    <button className="cart__item-button" onClick={() => decreaseItemQuantity(index)}>
                      -
                    </button>
                    <input
                      type="text"
                      className="cart__item-quantity-value"
                      value={item.producto.Cantidad}
                      readOnly
                    />
                    <button className="cart__item-button" onClick={() => addItemToCart(item)}>
                      +
                    </button>
                  </div>
                  <div className="cart__item-quantity-label">Cantidad:</div>
                  <span className="cart__item-quantity-value">{item.producto.Cantidad}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart__subtotal">Subtotal: ${calculateSubtotal()}</div>
          <div className="cart__buttons">
            <button onClick={handleButtonPress} className="cart__buy-button">
              Comprar
            </button>
            <button className="cart__clear cart__clear--red" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
