import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import app from '../Firebase/firebase';
import { useAuth } from './AuthProvider';

const ClientesContext = createContext();

export const useClientes = () => {
  return useContext(ClientesContext);
};

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const loadClientes = async (userId) => {
        try {
          const db = getFirestore(app);
          const userDocRef = doc(db, 'users', userId);
          const userClientesCollection = collection(userDocRef, 'clientes');

          const unsubscribe = onSnapshot(userClientesCollection, (querySnapshot) => {
            const clientesArray = [];
            querySnapshot.forEach((doc) => {
              clientesArray.push({ id: doc.id, ...doc.data() });
            });

            // Atualize o estado com os dados do banco de dados
            setClientes(clientesArray);
          });

          // Certifique-se de cancelar o ouvinte quando o componente é desmontado
          return () => unsubscribe();
        } catch (error) {
          console.error('Erro ao carregar clientes:', error);
        }
      };

      loadClientes(user.uid);
    }
  }, [user]);

  const addCliente = async (cliente, userId) => {
    try {
      const db = getFirestore(app);
      const userDocRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userClientesCollection = collection(userDocRef, 'clientes');

        await addDoc(userClientesCollection, cliente);

        // A lista de clientes será atualizada automaticamente pelo ouvinte em tempo real
        setModoEdicao(false);
        setClienteEditando(null);
      } else {
        console.error('Documento do usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  const updateCliente = async (cliente, userId) => {
    try {
      const db = getFirestore(app);
      const userDocRef = doc(db, 'users', userId);
      const userClientesCollection = collection(userDocRef, 'clientes');

      const clienteDoc = doc(userClientesCollection, cliente.id);
      await updateDoc(clienteDoc, cliente);

      // Atualize o estado diretamente após a atualização bem-sucedida
      setClientes((prevClientes) => prevClientes.map((c) => (c.id === cliente.id ? cliente : c)));
      setModoEdicao(false);
      setClienteEditando(null);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const deleteCliente = async (id, userId) => {
    try {
      const db = getFirestore(app);
      const userDocRef = doc(db, 'users', userId);
      const userClientesCollection = collection(userDocRef, 'clientes');

      const clienteDoc = doc(userClientesCollection, id);
      await deleteDoc(clienteDoc);

      // Atualize o estado diretamente após a exclusão bem-sucedida
      setClientes((prevClientes) => prevClientes.filter((c) => c.id !== id));
      setModoEdicao(false);
      setClienteEditando(null);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        addCliente,
        updateCliente,
        deleteCliente,
        modoEdicao,
        setModoEdicao,
        clienteEditando,
        setClienteEditando,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

ClientesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientesContext;
