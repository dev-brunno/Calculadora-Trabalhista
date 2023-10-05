import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'; // Substitua com o nome real do seu contexto

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Se o usuário estiver autenticado, retorne um Outlet que renderizará os elementos filhos
  // Se não, retorne um elemento que redirecionará para a página de login
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
