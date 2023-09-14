import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Estado inicial para o formulário de cliente
const initialClienteState = {
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  endereco: '',
  cidade: '',
  estado: '',
  cep: '',
  dataNascimento: '',
};

// Componente de formulário do cliente
function ClienteForm({ addCliente, updateCliente, editCliente, deleteCliente, onCancel }) {
  // Estados para controlar o formulário
  const [cliente, setCliente] = useState(initialClienteState);
  const [errors, setErrors] = useState({});
  const [enderecoLoading, setEnderecoLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Efeito para atualizar o formulário quando o cliente em edição muda
  useEffect(() => {
    if (editCliente) {
      setCliente(editCliente);
    } else {
      setCliente(initialClienteState);
    }
  }, [editCliente]);

  // Função para redefinir o formulário para seus valores iniciais
  const resetForm = () => {
    setCliente(initialClienteState);
    setErrors({});
  };

  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]:
        name === 'cpf' ? formatCPF(value) : name === 'telefone' ? formatTelefone(value) : value,
    });
  };

  // Função para buscar informações de endereço com base no CEP
  const handleCEPBlur = async () => {
    const { cep } = cliente;
    if (cep && cep.length === 8) {
      setEnderecoLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.ok) {
          const data = await response.json();
          if (!data.erro) {
            setCliente({
              ...cliente,
              endereco: data.logradouro,
              cidade: data.localidade,
              estado: data.uf,
            });
          }
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      } finally {
        setEnderecoLoading(false);
      }
    }
  };

  // Função para validar um endereço de e-mail
  const validateEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  // Funções para formatar CPF
  const formatCPF = (cpf) => {
    const numericCPF = cpf.replace(/\D/g, '');

    if (numericCPF.length <= 3) {
      return numericCPF;
    } else if (numericCPF.length <= 6) {
      return `${numericCPF.slice(0, 3)}.${numericCPF.slice(3)}`;
    } else if (numericCPF.length <= 9) {
      return `${numericCPF.slice(0, 3)}.${numericCPF.slice(3, 6)}.${numericCPF.slice(6)}`;
    } else {
      return `${numericCPF.slice(0, 3)}.${numericCPF.slice(3, 6)}.${numericCPF.slice(
        6,
        9,
      )}-${numericCPF.slice(9, 11)}`;
    }
  };

  // Funções para formatar número de telefone
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

  // Função para abrir a caixa de diálogo de confirmação
  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  // Função para confirmar a exclusão do cliente
  const handleConfirmDelete = () => {
    deleteCliente(editCliente.id); // Use o ID para exclusão
    setConfirmDelete(false);
    onCancel(); // Voltar para a lista de clientes após a exclusão
  };

  // Função para cancelar a exclusão do cliente
  const handleCancelDelete = () => {
    setConfirmDelete(false);
    onCancel(); // Voltar para a lista de clientes ao cancelar a exclusão
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!cliente.nome) {
      validationErrors.nome = 'O campo Nome é obrigatório.';
    }
    if (!cliente.cpf) {
      validationErrors.cpf = 'O campo CPF é obrigatório.';
    }
    if (cliente.email && !validateEmail(cliente.email)) {
      validationErrors.email = 'Email inválido.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      if (editCliente) {
        updateCliente(cliente);
      } else {
        addCliente(cliente);
      }
      resetForm(); // Redefinir o formulário após a adição ou edição
      onCancel(); // Voltar para a lista de clientes após a conclusão da edição ou adição
    }
  };

  return (
    <div>
      <div className=' border border-azulEscuro p-8 rounded-3xl relative'>
        <div className='absolute -left-8 -top-8'>
          <div className='relative'>
            <div className='bg-azulClaro w-28 h-28 rounded-full grid place-items-center shadow-md'>
              <div className=' bg-cinzaClaro w-24 h-24 rounded-full grid place-items-center text-azulClaro text-6xl'>
                <i className='fi fi-sr-user'></i>
              </div>
            </div>
          </div>
        </div>
        <div className='ml-16'>
          <h2 className='text-xl text-VerdeMedio'>
            {editCliente ? 'Editar Cliente' : 'Cadastro Cliente'}
          </h2>
          <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
          <div>
            {Object.keys(errors).length > 0 && (
              <div className='text-red-500'>
                {Object.values(errors).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <form className='text-lg flex flex-col space-y-2' onSubmit={handleSubmit}>
              <div className='space-y-2'>
                <div className='flex space-x-2'>
                  <label className='text-azulEscuro text-2xl mt-1' htmlFor='nome'>
                    <i className='fi fi-ss-user'></i>
                  </label>
                  <input
                    type='text'
                    id='nome'
                    name='nome'
                    placeholder='Nome completo'
                    value={cliente.nome}
                    onChange={handleInputChange}
                    className='border border-azulEscuro h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
                    required
                  />
                </div>
                <div className='flex space-x-2'>
                  <label className='text-azulEscuro text-2xl mt-1' htmlFor='cpf'>
                    <i className='fi fi-sr-id-badge'></i>
                  </label>
                  <input
                    type='text'
                    id='cpf'
                    name='cpf'
                    placeholder='CPF do Cliente'
                    value={formatCPF(cliente.cpf)}
                    onChange={handleInputChange}
                    className='border border-azulEscuro h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
                    required
                  />
                </div>
                <div className='flex space-x-2'>
                  <label className='text-azulEscuro text-2xl mt-1' htmlFor='dataNascimento'>
                    <i className='fi fi-sr-calendar'></i>
                  </label>
                  <input
                    type='date'
                    id='dataNascimento'
                    name='dataNascimento'
                    value={cliente.dataNascimento}
                    onChange={handleInputChange}
                    className='border border-azulEscuro h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
                  />
                </div>
                <div className='flex space-x-2'>
                  <label className='text-azulEscuro text-2xl mt-1' htmlFor='email'>
                    <i className='fi fi-sr-envelope'></i>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='E-mail'
                    value={cliente.email}
                    onChange={handleInputChange}
                    className='border border-azulEscuro h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
                  />
                </div>
                <div className='flex space-x-2'>
                  <label className='text-azulEscuro text-2xl mt-1' htmlFor='telefone'>
                    <i className='fi fi-sr-phone-flip'></i>
                  </label>
                  <input
                    type='tel'
                    id='telefone'
                    name='telefone'
                    placeholder='Telefone'
                    value={formatTelefone(cliente.telefone)}
                    onChange={handleInputChange}
                    className='border border-azulEscuro h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
                  />
                </div>
                <div className='flex space-x-2'>
                  <label className='text-azulEscuro text-2xl mt-1' htmlFor='cep'>
                    <i className='fi fi-sr-marker'></i>
                  </label>
                  <div className=' space-y-2'>
                    <div>
                      <div>
                        <input
                          type='text'
                          id='cep'
                          name='cep'
                          placeholder='CEP'
                          value={cliente.cep}
                          onChange={handleInputChange}
                          onBlur={handleCEPBlur}
                          className='border border-azulEscuro h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
                          required
                        />
                        {enderecoLoading && <p>Carregando...</p>}
                      </div>
                    </div>
                    <div>
                      <input
                        type='text'
                        id='endereco'
                        name='endereco'
                        placeholder='Endereço'
                        value={cliente.endereco}
                        onChange={handleInputChange}
                        className='border border-azulEscuro h-9 p-2 rounded-r-2xl rounded-bl-2xl text-sm w-52'
                      />
                    </div>
                    <div className='flex w-52 space-x-1'>
                      <div className='w-2/3'>
                        <input
                          type='text'
                          id='cidade'
                          name='cidade'
                          placeholder='Cidade'
                          value={cliente.cidade}
                          onChange={handleInputChange}
                          className='border border-azulEscuro  w-full h-9 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
                        />
                      </div>
                      <div className=' w-1/3'>
                        <input
                          type='text'
                          id='estado'
                          name='estado'
                          placeholder='Estado'
                          value={cliente.estado}
                          onChange={handleInputChange}
                          className='border border-azulEscuro h-9 w-full p-2 rounded-r-2xl rounded-bl-2xl text-sm '
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className=' p-2 flex justify-end'>
                  <button type='submit'>
                    <div className=' text-azulEscuro'>
                      <i>{editCliente ? 'Salvar' : 'Cadastrar'}</i>
                      <i className='fi fi-rr-arrow-small-right'></i>
                    </div>
                  </button>
                </div>
                {editCliente && (
                  <div className='bg-azulClaro w-10 h-10 rounded-full grid place-items-center absolute left-10 top-8'>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Impede o comportamento padrão do botão
                        handleDeleteClick();
                      }}
                      title='Excluir Cliente'
                      className='bg-cinzaClaro w-8 h-8 rounded-full grid place-items-center text-red-500'
                    >
                      <i className='fi fi-sr-delete-user'></i>
                    </button>
                  </div>
                )}

                {confirmDelete && (
                  <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50'>
                    <div className='bg-white p-4 rounded-lg shadow-lg'>
                      <p>Tem certeza que deseja excluir este cliente?</p>
                      <div className='mt-4 flex justify-end'>
                        <button
                          onClick={handleConfirmDelete}
                          className='text-red-500 mr-2 bg-gray-100 p-2 rounded-md'
                        >
                          Excluir
                        </button>
                        <button
                          onClick={handleCancelDelete}
                          className=' text-black mr-2 bg-blue-100 p-2 rounded-md'
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='inline-block text-cinzaEscuro absolute bottom-0 left-0'>
        <button className='bg-branco shadow-sm p-3 rounded-lg' type='button' onClick={onCancel}>
          <i className='fi fi-rr-arrow-small-left'> Cancelar</i>
        </button>
      </div>
    </div>
  );
}

// Definição das propriedades esperadas e seus tipos
ClienteForm.propTypes = {
  addCliente: PropTypes.func.isRequired,
  updateCliente: PropTypes.func.isRequired,
  editCliente: PropTypes.object,
  deleteCliente: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
};

export default ClienteForm;
