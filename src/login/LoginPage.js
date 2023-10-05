import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../Firebase/firebase';
import 'firebase/auth';
import { useAuth } from '../Context/AuthProvider';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    // Verificar se o usuário já está autenticado e redirecionar
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
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='username'
        />
        <input
          type='password'
          placeholder='Senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
        <button type='submit'>Entrar</button>
      </form>
      <p>
        Ainda não tem uma conta? <Link to='/register'>Registre-se</Link>
      </p>
    </div>
  );
}

export default LoginPage;
