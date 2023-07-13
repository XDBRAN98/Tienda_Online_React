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
  