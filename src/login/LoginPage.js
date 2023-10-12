import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../Firebase/firebase';
import 'firebase/auth';
import { useAuth } from '../Context/AuthProvider';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para controlar a mensagem de erro
  const history = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history('/calculos');
    }
  }, [auth.isAuthenticated, history]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history('/calculos');
    } catch (error) {
      setErrorMessage('Email ou senha incorretos. Por favor, verifique suas credenciais.'); // Defina a mensagem de erro
    }
  };

  return (
    <div className='lg:mt-32 mt-10'>
      <h2 className='text-azulEscuro font-medium text-lg text-center'>Sing in</h2>
      <form className='mt-12 flex flex-col items-center' onSubmit={handleLogin}>
        <div className='flex flex-col items-center space-y-3'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='username'
            className='border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
          />
          <input
            type='password'
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
            className='border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
          />
          {errorMessage && <p className=' text-red-500'>{errorMessage}</p>}{' '}
          {/* Exibe a mensagem de erro */}
          <div className='w-52'>
            <p className='text-right mt-2 text-cinzaMedio hover:text-azulEscuro'>
              <Link to='/esqueciasenha'>Esqueceu a senha?</Link>
            </p>
          </div>
        </div>
        <button className='bg-azulEscuro py-2 px-10 text-white rounded-2xl mt-8' type='submit'>
          Entrar
        </button>
      </form>
      <p className='mt-10 text-center'>
        Você não tem uma conta?{' '}
        <Link className='font-semibold' to='/register'>
          Crie uma nova
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
