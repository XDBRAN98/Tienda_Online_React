import React, { useState, useEffect } from 'react';
import './cart.css';
import ImageEmpty from '../../acces/pngwing.com.png';

const Cart = () => {
  const [items, setItems] = useState([]);
  const clienteId = JSON.parse(localStorage.getItem('user'))?.ID_Usuario;

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

  const decreaseItemQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].producto.Cantidad > 1) {
      updatedItems[index].producto.Cantidad -= 1;
      setItems(updatedItems);
    }
  };

  const removeItemFromCart = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
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
                  <img src={item.producto.Imagen} alt="Producto" />
                </div>
                <div className="cart__item-info">
                  <div className="cart__item-details">
                    <label className="cart__item-name">{item.producto.Nombre}</label>
                    <button
                      className="cart__item-remove"
                      onClick={() => removeItemFromCart(index)}
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
                </div>
              </li>
            ))}
          </ul>
          <div className="cart__subtotal">
            Subtotal: ${calculateSubtotal()}
          </div>
          <div className="cart__buttons">
            <button className="cart__buy-button">Comprar</button>
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
