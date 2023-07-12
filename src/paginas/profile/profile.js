import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";

const AdminProfileForm = () => {
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [originalDireccion, setOriginalDireccion] = useState("");
  const [originalTelefono, setOriginalTelefono] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("localhost:5000")
      .then((response) => {
        const data = response.data;
        setName(data.name);
        setLastname(data.lastname);
        setEmail(data.email);
        setPassword(data.password);
        setDireccion(data.direccion);
        setTelefono(data.telefono);
        setOriginalEmail(data.email);
        setOriginalPassword(data.password);
        setOriginalDireccion(data.direccion);
        setOriginalTelefono(data.telefono);
      })
      .catch((error) => console.error(error));
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login/updateProfile", {
        Email: email,
        Password: password,
        direccion: direccion,
        telefono: telefono,
      })
      .then((response) => {
        if (response && response.data) {
          setIsEditing(false);
          setSuccessMessage(response.data.message);
          setErrorMessage("");
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

  return (
    <div>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
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
          <label className="label">Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={handleTelefonoChange}
            disabled={!isEditing}
            className="input"
          />
        </div>
        {isEditing ? (
          <>
            <button type="submit" className="button">
              Actualizar
            </button>
            <button type="button" onClick={handleCancelClick} className="button">
              Cancelar
            </button>
          </>
        ) : (
          <button type="button" onClick={handleEditClick} className="button">
            Editar
          </button>
        )}
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AdminProfileForm;
