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
<<<<<<< HEAD
    // Obtenemos la información del usuario del localStorage
=======
    // Obtener el rol del usuario del local storage al cargar el componente
>>>>>>> 3395388cc64f0c4aa44bd226de7c2c786fe1805e
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
<<<<<<< HEAD
    // Eliminamos el usuario del local storage
    localStorage.removeItem('user');
=======
    // Lógica para realizar el logout del usuario
    // Limpiar los datos del local storage y restablecer el rol del usuario
    localStorage.clear();
    setUserRole(null);
        // Redireccionamos a la página de inicio y recargamos la página
>>>>>>> 3395388cc64f0c4aa44bd226de7c2c786fe1805e
    
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
<<<<<<< HEAD
        ) : 
        // Si el rol del usuario es 2 (usuario regular), mostramos solo el botón de cierre de sesión 
        userRole === 2 ? (
=======
        ) : userRole === 2 ? (
          // Mostrar opción de logout para el rol de usuario 2 (cliente)
>>>>>>> 3395388cc64f0c4aa44bd226de7c2c786fe1805e
          <>
            <button onClick={logout}>
              <div className="logout">
                <box-icon name="log-out"></box-icon>
              </div>
            </button>
          </>
<<<<<<< HEAD
        ) : 
        // Si el usuario no está logueado y no estamos en la página de inicio de sesión, mostramos el botón de inicio de sesión 
        location.pathname !== "/login" && (
          <Link to="/login">
            <div className="login">
              <box-icon name="user"></box-icon>
            </div>
          </Link>
=======
        ) : (
          // Mostrar opción de login para usuarios no autenticados, excepto en la página de login
          location.pathname !== "/login" && (
            <Link to="/login">
              <div className="login">
                <box-icon name="user"></box-icon>
              </div>
            </Link>
          )
>>>>>>> 3395388cc64f0c4aa44bd226de7c2c786fe1805e
        )}
      </div>
    </header>
  );
};
