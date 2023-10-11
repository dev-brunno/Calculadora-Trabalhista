import React, { useState } from 'react';
import firebase from '../Firebase/firebase';
import 'firebase/auth';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleResetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Um e-mail de redefinição de senha foi enviado para o endereço fornecido.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Esqueci Minha Senha</h2>
      {error && <p className='error'>{error}</p>}
      <p>Informe o seu endereço de e-mail para redefinir a sua senha.</p>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete='username'
      />
      <button type='button' onClick={handleResetPassword}>
        Redefinir Senha
      </button>
    </div>
  );
}

export default ForgotPasswordPage;
