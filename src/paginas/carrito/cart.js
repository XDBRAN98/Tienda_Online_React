import React, { useState } from 'react';
import './cart.css';
import ImageEmpty from '../../pngwing.com.png';

const Cart = () => {
  const [items, setItems] = useState([
    { name: 'Camiseta', quantity: 1, image: '' },
    { name: 'Pantalones', quantity: 1, image: 'url_de_la_imagen' },
    { name: 'Zapatos', quantity: 1, image: 'url_de_la_imagen' },
    { name: 'Bolso', quantity: 1, image: 'url_de_la_imagen' },
    { name: 'Gorra', quantity: 1, image: 'url_de_la_imagen' },
  ]); // Estado inicial con productos de prueba

  // Función para agregar un artículo al carrito
  const addItemToCart = (item) => {
    const updatedItems = [...items];
    const existingItemIndex = updatedItems.findIndex((i) => i.name === item.name);
    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      updatedItems.push({ name: item.name, quantity: 1, image: item.image });
    }
    setItems(updatedItems);
  };

  // Función para disminuir la cantidad de un artículo en el carrito
  const decreaseItemQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setItems(updatedItems);
    }
  };

  // Función para eliminar un artículo del carrito
  const removeItemFromCart = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setItems([]);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    items.forEach((item) => {
      // Lógica para calcular el subtotal por producto (precio * cantidad)
      subtotal += item.quantity * 10; // Reemplaza 10 con el precio real del producto
    });
    return subtotal;
  };

  return (
    <div className="cart">
      {items.length === 0 ? (
        <div className="cart__empty">
          <img src={ImageEmpty} />
          <p>No hay artículos en el carrito. </p>
          
        </div>
      ) : (
        <>
          <ul className="cart__list">
            {items.map((item, index) => (
              <li key={index} className="cart__item">
                <div className="cart__item-thumbnail">
                  <img src={item.image} alt="Producto" />
                </div>
                <div className="cart__item-info">
                  <div className="cart__item-details">
                   
                    <label className="cart__item-name">{item.name} </label>
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
                      value={item.quantity}
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


