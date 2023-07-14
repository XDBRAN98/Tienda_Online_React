import React, { useState, useEffect } from 'react';
import './cart.css';
import ImageEmpty from '../../acces/pngwing.com.png';
<<<<<<< HEAD
import { useCart } from '../../context/cart';
import { clear } from '@testing-library/user-event/dist/clear';

import { serverBackEndDireccion } from '../../rutas/serverback';


const URLServer =`${serverBackEndDireccion()}`;

=======
import axios from 'axios';
>>>>>>> parent of 0cbb9c9 (Merge pull request #21 from XDBRAN98/add)

const Cart = () => {
  const [items, setItems] = useState([]);
  const clienteId = JSON.parse(localStorage.getItem('user'))?.ID_Usuario;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${URL}carrito/${clienteId}`);
        const data = await response.json();
        console.log(data);
        setItems(data.productos);
      } catch (error) {
        console.error('Error al obtener los artículos del carrito:', error);
      }
    };

    if (clienteId) {
      fetchCartItems();
    }
  }, [clienteId]);

  const addItemToCart = (item) => {
    const updatedItems = [...items];
    const existingItemIndex = updatedItems.findIndex((i) => i.producto.ID_Producto === item.producto.ID_Producto);
    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].producto.Cantidad += 1;
    } else {
      updatedItems.push({ producto: { ...item.producto, Cantidad: 1 }, subtotal: item.subtotal });
    }
    setItems(updatedItems);
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
            unit_amount: calculateSubtotal()//200.00,
          },
          quantity: 1
        }
      ]
    }

    try {
      axios.post(`${URL}checkout`, formData)
        .then((res) => {
          console.log(res.data.result);
=======
      axios.post('http://localhost:5000/checkout', formData)
        .then(res => {
>>>>>>> parent of 0cbb9c9 (Merge pull request #21 from XDBRAN98/add)
          if (res.data.result) {
            window.location.href = res.data.result.url;
          }
        })
    } catch (error) {
      console.error(error);
    }
  };

<<<<<<< HEAD

  const addItemToCart = (producto) => {
    cart.changeCart(producto, 1);
=======
  const decreaseItemQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].producto.Cantidad > 1) {
      updatedItems[index].producto.Cantidad -= 1;
      setItems(updatedItems);
    }
>>>>>>> parent of 0cbb9c9 (Merge pull request #21 from XDBRAN98/add)
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
    cart.clear();
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
                    <button
  className="cart__item-remove"
  onClick={() => deleteItemFromCart(index)}
>
  Eliminar
</button>

                  </div>
                  <div className="cart__item-quantity">
                    <button
                      className="cart__item-button"
                      onClick={() => decreaseItemQuantity(index)}
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
                      onClick={() => addItemToCart(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart__item-quantity-label">Cantidad:</div>
                  <span className="cart__item-quantity-value">{item.producto.Cantidad}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart__subtotal">
            Subtotal: ${calculateSubtotal()}
          </div>
          <div className="cart__buttons">
            <button onClick={handleButtonPress} className="cart__buy-button">Comprar</button>
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
