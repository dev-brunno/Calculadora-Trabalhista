import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../Firebase/firebase';
import 'firebase/auth';
import 'firebase/firestore';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const history = useNavigate();

  const handleRegister = async () => {
    try {
      // Crie um novo usuário com email e senha
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Configure o nome de exibição do usuário
      await userCredential.user.updateProfile({
        displayName,
      });

      // Crie um documento de cliente no Firestore associado ao usuário com o mesmo UID
      await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
        nome: displayName,
        // Outros campos de cliente aqui...
      });

      history('/calculos'); // Redireciona para a página após o registro bem-sucedido
    } catch (error) {
      console.error('Erro no registro:', error.message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
        type='text'
        placeholder='Nome'
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Senha'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar</button>
      <p>
        Já tem uma conta? <Link to='/login'>Faça login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
