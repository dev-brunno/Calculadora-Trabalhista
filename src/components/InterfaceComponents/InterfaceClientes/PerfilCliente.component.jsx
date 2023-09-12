import React from 'react';
import PropTypes from 'prop-types';

function PerfilCliente({ cliente, onEditarClick, deleteCliente, onVoltarClick }) {
  // Função para renderizar um item de detalhe do cliente
  const renderDetailItem = (label, value) => (
    <li>
      <strong>{label}:</strong> {value}
    </li>
  );

  return (
    <div>
      <h2 className='text-2xl text-VerdeMedio'>Perfil do Cliente</h2>
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
      <ul>
        {renderDetailItem('Nome', cliente.nome)}
        {renderDetailItem('Data de Nascimento', cliente.dataNascimento)}
        {renderDetailItem('Email', cliente.email)}
        {renderDetailItem('CPF', cliente.cpf)}
        {renderDetailItem('Telefone', cliente.telefone)}
        {renderDetailItem('CEP', cliente.cep)}
        {renderDetailItem('Endereço', cliente.endereco)}
        {renderDetailItem('Cidade', cliente.cidade)}
        {renderDetailItem('Estado', cliente.estado)}
      </ul>
      <button onClick={onEditarClick}>Editar Cliente</button>
      <button onClick={() => deleteCliente(cliente.cpf)} className='text-red-500'>
        Excluir Cliente
      </button>
      <div className=' inline-block text-cinzaEscuro absolute bottom-0 left-0'>
        <button className=' bg-branco shadow-sm p-3 rounded-lg' onClick={onVoltarClick}>
          <i className='fi fi-rr-arrow-small-left'> Voltar</i>
        </button>
      </div>
    </div>
  );
}

PerfilCliente.propTypes = {
  cliente: PropTypes.object.isRequired,
  onEditarClick: PropTypes.func.isRequired,
  deleteCliente: PropTypes.func.isRequired,
  onVoltarClick: PropTypes.func.isRequired,
};

export default PerfilCliente;
