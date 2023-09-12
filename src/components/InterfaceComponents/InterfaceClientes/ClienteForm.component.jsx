import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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

function ClienteForm({ addCliente, updateCliente, editCliente, onCancel }) {
  const [cliente, setCliente] = useState(initialClienteState);
  const [errors, setErrors] = useState({});
  const [enderecoLoading, setEnderecoLoading] = useState(false);

  useEffect(() => {
    if (editCliente) {
      setCliente(editCliente);
    } else {
      setCliente(initialClienteState);
    }
  }, [editCliente]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]:
        name === 'cpf' ? formatCPF(value) : name === 'telefone' ? formatTelefone(value) : value,
    });
  };

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

  const validateEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

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
      setCliente(initialClienteState);
    }
  };

  const formFields = [
    { label: 'Nome', name: 'nome', type: 'text', required: true },
    { label: 'CPF', name: 'cpf', type: 'text', required: true },
    { label: 'Data de Nascimento', name: 'dataNascimento', type: 'date' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Telefone', name: 'telefone', type: 'tel' },
    { label: 'CEP', name: 'cep', type: 'text' },
    { label: 'Endereço', name: 'endereco', type: 'text' },
    { label: 'Cidade', name: 'cidade', type: 'text' },
    { label: 'Estado', name: 'estado', type: 'text' },
  ];

  return (
    <div>
      <h2 className='text-2xl text-VerdeMedio'>
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
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}:</label>
              {field.name === 'cep' ? (
                <div>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={cliente[field.name]}
                    onChange={handleInputChange}
                    onBlur={handleCEPBlur}
                    {...(field.required && { required: 'required' })}
                  />
                  {enderecoLoading && <p>Carregando...</p>}
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={
                    field.name === 'cpf'
                      ? formatCPF(cliente[field.name])
                      : field.name === 'telefone'
                      ? formatTelefone(cliente[field.name])
                      : cliente[field.name]
                  }
                  onChange={handleInputChange}
                  {...(field.required && { required: 'required' })}
                />
              )}
            </div>
          ))}
          <div>
            <button type='submit'>{editCliente ? 'Salvar' : 'Cadastrar'}</button>
            <div className='inline-block text-cinzaEscuro absolute bottom-0 left-0'>
              <button
                className='bg-branco shadow-sm p-3 rounded-lg'
                type='button'
                onClick={onCancel}
              >
                <i className='fi fi-rr-arrow-small-left'> Cancelar</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClienteForm;

ClienteForm.propTypes = {
  addCliente: PropTypes.func.isRequired,
  updateCliente: PropTypes.func.isRequired,
  editCliente: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
};
