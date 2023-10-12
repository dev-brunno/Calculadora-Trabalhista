import React, { useState } from 'react';
import { isEmail } from 'validator';
import { Link } from 'react-router-dom';
import firebase from '../Firebase/firebase';
import 'firebase/auth';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true); // Estado para controlar a validade do email

  const handleResetPassword = async () => {
    if (!isValidEmail) {
      setError('Por favor, insira um email válido.');
      return;
    }

    try {
      const signInMethods = await firebase.auth().fetchSignInMethodsForEmail(email);

      if (signInMethods.length === 0) {
        setError('Este email não está registrado. Por favor, verifique o email informado.');
      } else {
        await firebase.auth().sendPasswordResetEmail(email);
        setMostrarAviso(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Verifique a validade do email em tempo real
    setIsValidEmail(isEmail(inputEmail));
  };

  return (
    <div className=' flex flex-col items-center mt-20'>
      <div className=' p-10'>
        <div>
          <h2 className=' text-azulEscuro font-medium text-lg'>Esqueci Minha Senha</h2>
          <hr className='w-8 h-0.1 border-0 rounded bg-azulEscuro mt-1 mb-5'></hr>
        </div>
        <p className=' mb-5'>Informe o seu endereço de e-mail para redefinir a sua senha.</p>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
          autoComplete='username'
          className={`border-2 border-azulEscuro text-black h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm ${
            isValidEmail ? '' : 'border-red-500' // Adicione uma classe de estilo para destacar emails inválidos
          }`}
        />
        {!isValidEmail && <p className=' text-red-500'>Por favor, insira um email válido.</p>}
        {error && <p className=' text-red-500'>{error}</p>}
        <div className=' mt-5 flex justify-end'>
          <button className='hover:text-azulEscuro' type='button' onClick={handleResetPassword}>
            <div className=' flex justify-end'>
              <span>Enviar</span>
              <div className='mt-1'>
                <i className='fi fi-sr-caret-right'></i>
              </div>
            </div>
          </button>
        </div>
      </div>
      {/* Aviso de email enviado com sucesso */}
      {mostrarAviso && (
        <div className='fixed bottom-4 right-4 border-2 border-green-500 rounded-lg bg-branco z-10'>
          <div className='p-3 rounded flex divide-x space-x-2'>
            <div className=' space-x-2 flex text-green-500 text-lg'>
              <div>
                <i className='fi fi-ss-check-circle'></i>
              </div>
              <span className=' text-sm text-preto font-semibold'>
                O Email para redefinição de senha foi enviado.
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
      <p className=' mt-10'>
        Já tem uma conta?{' '}
        <Link className=' font-semibold' to='/login'>
          Faça login
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
