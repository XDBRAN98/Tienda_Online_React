import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear el objeto de datos que se enviará en la solicitud
      const data = {
        Email: email,
        Password: password
      };

      // Realizar la solicitud POST al API
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        // Aquí puedes manejar la respuesta del servidor
        console.log(result);
        const { accessToken } = result;
        // Guardar el accessToken en el localStorage
        localStorage.setItem('accessToken', accessToken);
        // Realizar las acciones necesarias después de autenticar al usuario
      } else {
        throw new Error('Error al iniciar sesión');
      }
    } catch (error) {
      // Manejar el error en caso de que ocurra
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = () => {
    console.log('Olvidé mi contraseña');
  };

  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
          <div className="login-form-links">
            <button type="button" className="register-button">
              <Link to="/register">Register</Link>
            </button>
            <button type="button" className="forgot-password-button" onClick={handleForgotPassword}>
              Olvidé mi contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
