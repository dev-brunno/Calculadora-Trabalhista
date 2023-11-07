import React, { useState } from 'react';
import { useAuth } from '../Context/AuthProvider'; // Importe o contexto de autenticação

function Contato() {
  const { user } = useAuth(); // Obtenha o estado do usuário do contexto de autenticação

  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState(user ? user.displayName : ''); // Use o nome do usuário autenticado
  const [email, setEmail] = useState(user ? user.email : ''); // Use o email do usuário autenticado
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar o email para o desenvolvedor aqui
    // Substitua o código abaixo pelo envio de email real
    const corpoEmail = `
      Tópico: ${topic}
      Mensagem: ${message}
      Nome: ${name}
      Email: ${email}
    `;
    // Suponha que você envie o e-mail aqui com essas variáveis
    console.log('Email enviado:', corpoEmail);
    setEnviado(true);
  };

  return (
    <div className='w-full'>
      <div className='m-2 mt-8 lg:m-8 flex justify-center lg:justify-start'>
        <div className='bg-branco dark:bg-dark1 shadow-lg border rounded-4xl border-solid border-cinzaMedio dark:border-dark4 inline-block p-6 pb-16 lg:p-10'>
          <h1 className='text-2xl font-semibold mb-4 text-azulEscuro'>Entre em Contato</h1>
          {enviado ? (
            <div className='bg-green-200 p-4 rounded-md mb-4'>
              O feedback foi enviado com sucesso. Obrigado por entrar em contato!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='mb-4 space-y-1'>
                <label htmlFor='topic' className='block text-sm font-medium text-gray-400'>
                  Tópico
                </label>
                <input
                  type='text'
                  id='topic'
                  name='topic'
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className='border border-gray-300 rounded-xl w-full py-2 px-3'
                  required
                />
              </div>
              <div className='mb-4 space-y-1'>
                <label htmlFor='message' className='block text-sm font-medium text-gray-400'>
                  Mensagem
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className='border border-gray-300 rounded-xl w-full py-2 px-3'
                  required
                />
              </div>
              <div className='mb-4 space-y-1'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-400'>
                  Nome
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='border border-gray-300 rounded-xl w-full py-2 px-3'
                  required
                />
              </div>
              <div className='mb-4 space-y-1'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-400'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='border border-gray-300 rounded-xl w-full py-2 px-3'
                  required
                />
              </div>
              <button
                type='submit'
                className='bg-azulEscuro text-white py-2 px-4 rounded hover:bg-blue-600 w-36 text-sm'
              >
                Enviar Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contato;
