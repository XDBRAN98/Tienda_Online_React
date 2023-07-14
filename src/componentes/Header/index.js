// Importamos los paquetes necesarios
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import 'boxicons';
import Logo from "../../acces/logo.png";

// Creamos el componente Header
export const Header = () => {
  // Usamos el hook useLocation para obtener la ruta actual
  const location = useLocation();

  // Definimos el estado para el rol del usuario
  const [userRole, setUserRole] = useState(null);

  // Creamos un efecto para escuchar cambios en la ubicación (ruta)
  // Y verificar el rol del usuario cada vez que cambia la ruta
  useEffect(() => {
    // Obtenemos la información del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Si el usuario existe, establecemos su rol en el estado
    // De lo contrario, establecemos el rol del usuario a null
    if (user) {
      setUserRole(user.ID_Rol);
    } else {
      setUserRole(null);
    }
  }, [location]); // Este efecto se dispara cada vez que la ruta cambia

  // Creamos la función de cierre de sesión
  const logout = () => {
    // Eliminamos el usuario del local storage
    localStorage.removeItem('user');
    
    // Establecemos el rol del usuario a null
    setUserRole(null);

    // Redireccionamos a la página de inicio y recargamos la página
    window.location.reload();
    window.location.href = "/";
  }

  // Renderizamos el componente
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
          <span className="item__total">0</span>
        </div>

        {/* Si el rol del usuario es 1 (administrador), mostramos el perfil y el botón de cierre de sesión */}
        {userRole === 1 ? (
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
        ) : 
        // Si el rol del usuario es 2 (usuario regular), mostramos solo el botón de cierre de sesión 
        userRole === 2 ? (
          <>
            <button onClick={logout}>
              <div className="logout">
                <box-icon name="log-out"></box-icon>
              </div>
            </button>
          </>
        ) : 
        // Si el usuario no está logueado y no estamos en la página de inicio de sesión, mostramos el botón de inicio de sesión 
        location.pathname !== "/login" && (
          <Link to="/login">
            <div className="login">
              <box-icon name="user"></box-icon>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};
