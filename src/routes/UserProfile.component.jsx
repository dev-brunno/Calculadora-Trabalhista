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
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [mostrarSenhaEnviada, setMostrarSenhaEnviada] = useState(false);
  const [bloquearSalvar, setBloquearSalvar] = useState(false); // Estado para bloquear "Salvar Alterações"
  const [bloquearRedefinir, setBloquearRedefinir] = useState(false); // Estado para bloquear "Redefinir Senha"


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
      setBloquearSalvar(true);
      const userDocRef = firebase.firestore().collection('users').doc(user.uid);
      await userDocRef.update(userData);
      console.log('Informações do usuário atualizadas com sucesso.');
      setMostrarAviso(true); // Exibe a notificação após salvar as alterações
      // Desbloqueia o botão após 5 segundos
      setTimeout(() => {
        setBloquearSalvar(false);
      }, 5000);
    } catch (error) {
      console.error('Erro ao atualizar informações do usuário:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      setBloquearRedefinir(true);
      await firebase.auth().sendPasswordResetEmail(user.email);
      console.log('E-mail de redefinição de senha enviado com sucesso.');
      setMostrarSenhaEnviada(true); // Exibe a notificação após o envio do e-mail
      // Desbloqueia o botão após 5 segundos
      setTimeout(() => {
        setBloquearRedefinir(false);
      }, 5000);
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
        <div className=' bg-branco dark:bg-dark1 shadow-lg border rounded-4xl border-solid border-cinzaMedio dark:border-dark4 inline-block p-6 pb-16 lg:p-10'>
          <div className='mx-auto border border-azulEscuro p-10 rounded-3xl'>
            <h1 className='text-2xl font-semibold mb-4 text-azulEscuro'>Editar Perfil</h1>
            <form>
              <div className='mb-4 space-y-1'>
                <label htmlFor='username' className='block text-sm font-medium text-gray-400'>
                  Nome de Usuário
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={userData.username}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl w-full py-2 px-3'
                />
              </div>
              <div className='mb-4 space-y-1'>
                <label htmlFor='displayName' className='block text-sm font-medium text-gray-400'>
                  Nome Completo
                </label>
                <input
                  type='text'
                  id='displayName'
                  name='displayName'
                  value={userData.displayName}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl w-full py-2 px-3'
                />
              </div>
              <div className='mb-4 space-y-1'>
                <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-400'>
                  Número de Telefone
                </label>
                <input
                  type='tel'
                  id='phoneNumber'
                  name='phoneNumber'
                  value={formatTelefone(userData.phoneNumber)}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl w-full py-2 px-3'
                />
              </div>
              <div className='mb-4 space-y-1'>
                <label htmlFor='oabNumber' className='block text-sm font-medium text-gray-400'>
                  Número da OAB
                </label>
                <input
                  type='text'
                  id='oabNumber'
                  name='oabNumber'
                  value={userData.oabNumber}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl w-full py-2 px-3'
                />
              </div>
              <div className=' mt-10'>
                <button
                  type='button'
                  onClick={handleSaveChanges}
                  disabled={bloquearSalvar} // Bloqueia o botão quando "bloquearSalvar" for verdadeiro
                  className={`bg-azulEscuro text-white py-2 px-4 rounded hover:bg-blue-600 w-36 text-sm ${
                    bloquearSalvar ? 'cursor-not-allowed' : ''
                  }`}
                >
                  Salvar Alterações
                </button>
                <button
                  type='button'
                  onClick={handleResetPassword}
                  disabled={bloquearRedefinir} // Bloqueia o botão quando "bloquearRedefinir" for verdadeiro
                  className={`bg-cinzaEscuro text-white py-2 px-4 rounded ml-4 hover-bg-red-600 w-36 text-sm ${
                    bloquearRedefinir ? 'cursor-not-allowed' : ''
                  }`}
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
            {/* Notificação de envio de e-mail de redefinição de senha */}
            {mostrarSenhaEnviada && (
              <div className='fixed bottom-4 right-4 border-2 border-blue-500 rounded-lg bg-branco z-10'>
                <div className='p-3 rounded flex divide-x space-x-2'>
                  <div className='space-x-2 flex text-lg'>
                    <div>
                      <i className="fi fi-rr-envelope-download"></i>
                    </div>
                    <span className='text-sm text-preto font-semibold'>
                      Um e-mail de redefinição de senha foi enviado com sucesso.
                    </span>
                  </div>
                  <button
                    className='text-sm font-semibold text-preto pl-2'
                    onClick={() => setMostrarSenhaEnviada(false)}
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
