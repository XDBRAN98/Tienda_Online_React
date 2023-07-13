import { Navigate } from 'react-router-dom';

export function autenticacionGuard(Componente) {
    const accessToken = localStorage.getItem('accessToken');
  
    if (accessToken) {
      // El usuario está autenticado, permite el acceso al componente
      return Componente;
    } else {
      // El usuario no está autenticado, redirige o muestra un componente de inicio de sesión
      return <Navigate to="/login" />;
    }
  }
  //guard de admin

  export function adminGuard(Componente) {
    const accessToken = localStorage.getItem('accessToken');
    const admin = JSON.parse(localStorage.getItem('user'));
    
    if (admin && admin.ID_Rol === 1 && accessToken) {
      // El usuario está autenticado y es un administrador, permite el acceso al componente
      return Componente;
    } else {
      // Redirige a la página de inicio
      return <Navigate to="/" replace />;
    }
  }
  