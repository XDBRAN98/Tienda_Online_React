import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import 'boxicons';
import Logo from "../../acces/logo.png";

export const Header = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Obtener el rol del usuario del local storage al cargar el componente
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.ID_Rol);
    } else {
      setUserRole(null);
    }
  }, [location]);

  const logout = () => {
    // Lógica para realizar el logout del usuario
    // Limpiar los datos del local storage y restablecer el rol del usuario
    localStorage.clear();
    setUserRole(null);
        // Redireccionamos a la página de inicio y recargamos la página
    
    window.location.reload();
    window.location.href = "/";
  }

  return (
    <header className="header__primario">
      <Link to="/">
        <div className="logo">
          <img src={Logo} alt="" width="200" />
        </div>
      </Link>
      <div className="header_icons">
        <div className="cart">
          <Link to={"/cart"}>
            <box-icon name="cart" size="smallest"></box-icon>
          </Link>
          
        </div>

        {userRole === 1 ? (
          // Mostrar opciones adicionales para el rol de usuario 1 (administrador)
          <>
            <div className="profile">
              <Link to="/profile">
                <box-icon name="user"></box-icon>
              </Link>
            </div>

            <div className="logout">
              <button className="logoutBt" onClick={logout}>
                <div className="logout">
                  <box-icon name="log-out"></box-icon>
                </div>
              </button>
            </div>
          </>
        ) : userRole === 2 ? (
          // Mostrar opción de logout para el rol de usuario 2 (cliente)
          <>
            <button onClick={logout}>
              <div className="logout">
                <box-icon name="log-out"></box-icon>
              </div>
            </button>
          </>
        ) : (
          // Mostrar opción de login para usuarios no autenticados, excepto en la página de login
          location.pathname !== "/login" && (
            <Link to="/login">
              <div className="login">
                <box-icon name="user"></box-icon>
              </div>
            </Link>
          )
        )}
      </div>
    </header>
  );
};
