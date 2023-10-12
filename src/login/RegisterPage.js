import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../Firebase/firebase';
import 'firebase/auth';
import 'firebase/firestore';

// Função para formatar número de telefone
const formatTelefone = (telefone) => {
  const numericTelefone = telefone.replace(/\D/g, '');

  if (numericTelefone.length === 11) {
    return `(${numericTelefone.slice(0, 2)}) ${numericTelefone.slice(2, 7)}-${numericTelefone.slice(
      7,
    )}`;
  } else if (numericTelefone.length === 10) {
    return `(${numericTelefone.slice(0, 2)}) ${numericTelefone.slice(2, 6)}-${numericTelefone.slice(
      6,
    )}`;
  } else if (numericTelefone.length === 9) {
    return `(${numericTelefone.slice(0, 2)}) ${numericTelefone.slice(2, 5)}-${numericTelefone.slice(
      5,
    )}`;
  } else if (numericTelefone.length === 8) {
    return `${numericTelefone.slice(0, 4)}-${numericTelefone.slice(4)}`;
  } else {
    return numericTelefone;
  }
};

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [oabNumber, setOabNumber] = useState('');
  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Evita que o formulário seja enviado por padrão

    try {
      // Verifique se as senhas coincidem
      if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
      }

      // Verifique os limites de caracteres para campos relevantes
      if (phoneNumber.length > 15) {
        alert('Número de telefone muito longo.');
        return;
      }

      // Crie um novo usuário com email e senha
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Configure o nome de exibição do usuário
      await userCredential.user.updateProfile({
        displayName,
      });

      // Crie um documento de cliente no Firestore associado ao usuário com o mesmo UID
      await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
        username,
        email,
        phoneNumber,
        displayName,
        oabNumber,
        // Outros campos de cliente aqui...
      });

      history('/calculos'); // Redireciona para a página após o registro bem-sucedido
    } catch (error) {
      console.error('Erro no registro:', error.message);
    }
  };

  return (
    <div className=' flex flex-col items-center mt-20'>
      <div>
        <div>
          <h2 className=' text-azulEscuro font-medium text-lg'>Sing Up</h2>
          <hr className='w-8 h-0.1 border-0 rounded bg-azulEscuro mt-1 mb-5'></hr>
        </div>
        <form onSubmit={handleRegister}>
          <div className=' flex flex-col space-y-2'>
            <input
              type='text'
              placeholder='Nome de Usuário'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={255} // Limite de 255 caracteres
              className='border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
            />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255} // Limite de 255 caracteres
              autoComplete='email'
              className='border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
            />
            <input
              type='password'
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={255}
              autoComplete='new-password' // Adicione este atributo
              className='border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
            />
            <input
              type='password'
              placeholder='Confirme a Senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              maxLength={255}
              autoComplete='new-password' // Adicione este atributo
              className='border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
            />
            <input
              type='text'
              placeholder='Número de Telefone'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatTelefone(e.target.value))}
              maxLength={15} // Limite de 15 caracteres
              className='border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
            />
            <input
              type='text'
              placeholder='Nome Completo do Advogado ou Nome da Empresa'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={255} // Limite de 255 caracteres
              className='border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
            />
            <input
              type='text'
              placeholder='Número de Registro na OAB'
              value={oabNumber}
              onChange={(e) => setOabNumber(e.target.value)}
              maxLength={20} // Limite de 20 caracteres
              className='border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
            />
          </div>
          <div className=' mt-5 flex justify-end'>
            <button className=' hover:text-azulEscuro' type='submit'>
              <div className=' flex justify-end'>
                <span>Cadastre-se</span>
                <div className='mt-1'>
                  <i className='fi fi-sr-caret-right'></i>
                </div>
              </div>
            </button>
          </div>
        </form>
        <p className=' mt-10'>
          Já tem uma conta?{' '}
          <Link className=' font-semibold' to='/login'>
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
