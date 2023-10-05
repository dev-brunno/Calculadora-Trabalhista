import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes
import firebase from '../Firebase/firebase';
import 'firebase/compat/auth';

// Crie o contexto de autenticação
export const AuthContext = createContext();

// Componente de provedor de contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Configurar um observador de autenticação do Firebase
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // O usuário está autenticado
        setUser(authUser);
      } else {
        // O usuário não está autenticado
        setUser(null);
      }
    });

    // Remover o observador quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  // Função para fazer logout
  const signout = async () => {
    await firebase.auth().signOut();
  };

  // Contexto de autenticação
  const authContext = {
    user,
    isAuthenticated: !!user,
    signout,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

// Hook personalizado para acessar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}

// Defina PropTypes para AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Certifique-se de adicionar esta linha
};
