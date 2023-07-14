
import React, { useState, useEffect } from 'react';
import './cart.css';
<<<<<<< HEAD
import axios from 'axios';
import ImageEmpty from '../../acces/pngwing.com.png';
import { useCart } from '../../context/cart';
import { clear } from '@testing-library/user-event/dist/clear';


=======
import ImageEmpty from '../../acces/pngwing.com.png';
>>>>>>> parent of 3a2673a (Merge pull request #20 from XDBRAN98/add)

const Cart = () => {
  const [items, setItems] = useState([]);
  const clienteId = JSON.parse(localStorage.getItem('user'))?.ID_Usuario;
  const cart = useCart();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/carrito/${clienteId}`);
        const data = await response.json();
        setItems(data.productos);
      } catch (error) {
        console.error('Error al obtener los artículos del carrito:', error);
      }
    };

    if (clienteId) {
      fetchCartItems();
    }
  }, [clienteId]);

<<<<<<< HEAD
  const handleButtonPress = async () => {
    const formData = {
      line_items: [
        {
          price_data: {
            product_data: {
              name: 'Nombre del producto', // Asegúrate de proporcionar el nombre del producto aquí
              description: 'Cobro por productos en el carrito',
            },
            currency: 'COP',
            unit_amount: calculateSubtotal()
          },
          quantity: 1
        }
      ]
    };
    

    try {
      axios.post('http://localhost:5000/checkout', formData)
        .then((res) => {
          console.log(res.data.result);
          if (res.data.result) {
            window.location.href = res.data.result.url;
          }
        });
    } catch (error) {
      console.error(error);
    }
  };




  const addItemToCart = (producto) => {
    cart.changeCart(producto, 1);
  };

  const decreaseItemQuantity = (producto) => {
    cart.changeCart(producto, -1);
  };

=======
  const addItemToCart = (item) => {
    // Añadir un artículo al carrito
    const updatedItems = [...items];
    const existingItemIndex = updatedItems.findIndex((i) => i.producto.ID_Producto === item.producto.ID_Producto);
    if (existingItemIndex !== -1) {
      // Si el artículo ya existe en el carrito, incrementar la cantidad
      updatedItems[existingItemIndex].producto.Cantidad += 1;
    } else {
      // Si el artículo no existe en el carrito, agregarlo
      updatedItems.push({ producto: { ...item.producto, Cantidad: 1 }, subtotal: item.subtotal });
    }
    setItems(updatedItems);
  };

  const decreaseItemQuantity = (index) => {
    // Disminuir la cantidad de un artículo en el carrito
    const updatedItems = [...items];
    if (updatedItems[index].producto.Cantidad > 1) {
      updatedItems[index].producto.Cantidad -= 1;
      setItems(updatedItems);
    }
  };

  const removeItemFromCart = (index) => {
    // Eliminar un artículo del carrito
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
>>>>>>> parent of 3a2673a (Merge pull request #20 from XDBRAN98/add)

  

  const removeItemFromCart = (ID_Producto) => {
    
    cart.removeItem(ID_Producto);
    setItems(cart.cart.productos);
  };

  const clearCart = () => {
    // Vaciar el carrito
    setItems([]);
  };

  const calculateSubtotal = () => {
    // Calcular el subtotal de todos los artículos en el carrito
    let subtotal = 0;
    cart?.cart?.productos?.forEach((item) => {
      subtotal += item.producto.Precio * item.producto.Cantidad;
    });
    return subtotal;
  };

  return (
    <div className="cart">
<<<<<<< HEAD
      {cart?.cart?.productos.length === 0 ? (
=======
      {items.length === 0 ? (
        // Mostrar mensaje de carrito vacío si no hay artículos
>>>>>>> parent of 3a2673a (Merge pull request #20 from XDBRAN98/add)
        <div className="cart__empty">
          <img src={ImageEmpty} alt="Carrito vacío" />
          <p>No hay artículos en el carrito.</p>
        </div>
      ) : (
        <>
          {/* Mostrar la lista de artículos en el carrito */}
          <ul className="cart__list">
            {cart.cart?.productos.map((item, index) => (
              <li key={index} className="cart__item">
                <div className="cart__item-thumbnail">
                  <img src={item.producto.Imagen} alt="Producto" />
                </div>
                <div className="cart__item-info">
                  <div className="cart__item-details">
                    <label className="cart__item-name">{item.producto.Nombre}</label>
                    <button
                      className="cart__item-remove"
<<<<<<< HEAD
                      onClick={() => removeItemFromCart(item.producto.ID_Producto)}
=======
                      onClick={() => removeItemFromCart(index)}
>>>>>>> parent of 3a2673a (Merge pull request #20 from XDBRAN98/add)
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="cart__item-quantity">
                    <button
                      className="cart__item-button"
                      onClick={() => decreaseItemQuantity(item.producto)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="cart__item-quantity-value"
                      value={item.producto.Cantidad}
                      readOnly
                    />
                    <button
                      className="cart__item-button"
                      onClick={() => addItemToCart(item.producto)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart__subtotal">
            Subtotal: ${calculateSubtotal()}
          </div>
          <div className="cart__buttons">
<<<<<<< HEAD
            <button className="cart__buy-button" onClick={handleButtonPress}>Comprar</button>
            <button className="cart_clear cart_clear--red" onClick={clearCart}>
=======
            <button className="cart__buy-button">Comprar</button>
            <button className="cart__clear cart__clear--red" onClick={clearCart}>
>>>>>>> parent of 3a2673a (Merge pull request #20 from XDBRAN98/add)
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;