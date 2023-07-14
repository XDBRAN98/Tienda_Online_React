// Importamos los paquetes necesarios
import React, { useState } from "react";
import axios from "axios";
import "./profile.css";
import { serverBackEndDireccion } from '../../rutas/serverback';
import EditProduct from '../../componentes/Edit/Edit'

// Definimos la URL del servidor
const URL =`${serverBackEndDireccion()}edit`;

// Obtenemos los datos del usuario almacenados en localStorage
const usuario = JSON.parse(localStorage.getItem("user"));

// Creamos el componente AdminProfileForm
const AdminProfileForm = () => {
  // Inicializamos los estados de la aplicación
  const [originalEmail, setOriginalEmail] = useState(usuario.Email);
  const [originalPassword,] = useState(usuario.Password);
  const [originalDireccion, setOriginalDireccion] = useState(usuario.Direccion);
  const [originalTelefono, setOriginalTelefono] = useState(usuario.Telefono);
  const [name, ] = useState(usuario.Nombre);
  const [lastname,] = useState(usuario.Apellido);
  const [email, setEmail] = useState(usuario.Email);
  const [password, setPassword] = useState(usuario.Contraseña);
  const [direccion, setDireccion] = useState(usuario.Direccion);
  const [telefono, setTelefono] = useState(usuario.Telefono);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Creamos los manejadores de eventos para los cambios en los campos del formulario
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  // Creamos los manejadores de eventos para el botón de edición y cancelación
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEmail(originalEmail);
    setPassword(originalPassword);
    setDireccion(originalDireccion);
    setTelefono(originalTelefono);
  };

  // Creamos el manejador de eventos para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Creamos el objeto con los datos actualizados del perfil
    const updatedProfile = {
      Name: name,
      Lastname: lastname,
      Email: email,
      Password: password,
      Direccion: direccion,
      Telefono: telefono,
    };

    // Realizamos la petición al servidor para actualizar el perfil
    axios
      .put(URL, updatedProfile)
      .then((response) => {
        if (response && response.data) {
          setIsEditing(false);
          setSuccessMessage(response.data.message);
          setErrorMessage("");
          setOriginalEmail(email);
          setOriginalDireccion(direccion);
          setOriginalTelefono(telefono);
        } else {
          console.error('La respuesta no contiene la propiedad "data"');
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error);
          setSuccessMessage("");
        } else {
          console.error(error);
        }
      });
  };

  // Renderizamos el componente
  return (
    <div className = "registration">
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="fullName">
            <div className="form-group">
            <label>Informacion Personal</label>
              <label className="label">Nombre:</label>
              <input
                type="text"
                value={name}
                disabled
                className="input"
              />
            </div>
            <div className="form-group">
              <label className="label">Apellidos:</label>
              <input
                type="text"
                value={lastname}
                disabled
                className="input"
              />
            </div>
        </div>
        <div className="form-group">
          <label className="label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={handleDireccionChange}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Telefono:</label>
          <input
            type="text"
            value={telefono}
            onChange={handleTelefonoChange}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div className="form-group">
          {isEditing ? (
            <div>
              <button type="submit" className="button">
                Guardar Cambios
              </button>
              <button onClick={handleCancelClick} className="button">
                Cancelar
              </button>
            </div>
          ) : (
            <button onClick={handleEditClick} className="button">
              Editar Perfil
            </button>
          )}
        </div>
      </form>

    

      {successMessage && <p className="success-message">{successMessage}</p>}   
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      
      <EditProduct/>
    </div>
  );
};

export default AdminProfileForm;

