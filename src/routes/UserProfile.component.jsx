import React, { useState, useEffect } from 'react';
import firebase from '../Firebase/firebase';
import 'firebase/firestore';
import { useAuth } from '../Context/AuthProvider';

function UserProfile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    username: '',
    phoneNumber: '',
    oabNumber: '',
    displayName: '',
  });
  const [mostrarAviso, setMostrarAviso] = useState(false); // Adicione o estado para controlar a notificação

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = firebase.firestore().collection('users').doc(user.uid);
          const userDocSnapshot = await userDocRef.get();

          if (userDocSnapshot.exists) {
            const userData = userDocSnapshot.data();
            setUserData(userData);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const userDocRef = firebase.firestore().collection('users').doc(user.uid);
      await userDocRef.update(userData);
      console.log('Informações do usuário atualizadas com sucesso.');
      setMostrarAviso(true); // Exibe a notificação após salvar as alterações
    } catch (error) {
      console.error('Erro ao atualizar informações do usuário:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(user.email);
      console.log('E-mail de redefinição de senha enviado com sucesso.');
    } catch (error) {
      console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
    }
  };

  // Função para formatar número de telefone
  const formatTelefone = (telefone) => {
    const numericTelefone = telefone.replace(/\D/g, '');

    if (numericTelefone.length === 11) {
      return `(${numericTelefone.slice(0, 2)}) ${numericTelefone.slice(
        2,
        7,
      )}-${numericTelefone.slice(7)}`;
    } else if (numericTelefone.length === 10) {
      return `(${numericTelefone.slice(0, 2)}) ${numericTelefone.slice(
        2,
        6,
      )}-${numericTelefone.slice(6)}`;
    } else if (numericTelefone.length === 9) {
      return `(${numericTelefone.slice(0, 2)}) ${numericTelefone.slice(
        2,
        5,
      )}-${numericTelefone.slice(5)}`;
    } else if (numericTelefone.length === 8) {
      return `${numericTelefone.slice(0, 4)}-${numericTelefone.slice(4)}`;
    } else {
      return numericTelefone;
    }
  };

  return (
    <div className=' w-full'>
      <div className=' m-2 mt-8 lg:m-8 flex justify-center lg:justify-start'>
        <div className=' bg-branco dark:bg-dark1 shadow-lg border rounded-4xl border-solid border-cinzaMedio dark:border-dark4 inline-block p-6 pb-16 lg:p-16'>
          <div className='mx-auto'>
            <h1 className='text-2xl font-semibold mb-4'>Editar Perfil</h1>
            <form>
              <div className='mb-4'>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                  Nome de Usuário
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={userData.username}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded w-full py-2 px-3'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='displayName' className='block text-sm font-medium text-gray-700'>
                  Nome Completo
                </label>
                <input
                  type='text'
                  id='displayName'
                  name='displayName'
                  value={userData.displayName}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded w-full py-2 px-3'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700'>
                  Número de Telefone
                </label>
                <input
                  type='tel'
                  id='phoneNumber'
                  name='phoneNumber'
                  value={formatTelefone(userData.phoneNumber)}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded w-full py-2 px-3'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='oabNumber' className='block text-sm font-medium text-gray-700'>
                  Número da OAB
                </label>
                <input
                  type='text'
                  id='oabNumber'
                  name='oabNumber'
                  value={userData.oabNumber}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded w-full py-2 px-3'
                />
              </div>
              <div className=' mt-10'>
                <button
                  type='button'
                  onClick={handleSaveChanges}
                  className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-36 text-sm'
                >
                  Salvar Alterações
                </button>
                <button
                  type='button'
                  onClick={handleResetPassword}
                  className='bg-red-500 text-white py-2 px-4 rounded ml-4 hover-bg-red-600 w-36 text-sm'
                >
                  Redefinir Senha
                </button>
              </div>
            </form>
            {/* Notificação de alterações salvas */}
            {mostrarAviso && (
              <div className='fixed bottom-4 right-4 border-2 border-green-500 rounded-lg bg-branco z-10'>
                <div className='p-3 rounded flex divide-x space-x-2'>
                  <div className='space-x-2 flex text-green-500 text-lg'>
                    <div>
                      <i className='fi fi-ss-check-circle'></i>
                    </div>
                    <span className='text-sm text-preto font-semibold'>
                      As alterações de perfil foram salvas com sucesso.
                    </span>
                  </div>
                  <button
                    className='text-sm font-semibold text-preto pl-2'
                    onClick={() => setMostrarAviso(false)}
                  >
                    <i className='fi fi-br-cross-small'></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
