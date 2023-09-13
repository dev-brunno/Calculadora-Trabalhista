import React from 'react';
import PropTypes from 'prop-types';

function PerfilCliente({ cliente, onEditarClick, deleteCliente, onVoltarClick }) {
  // Função para renderizar um item de detalhe do cliente
  const renderDetailItem = (label, value) => (
    <li className='flex space-x-1'>
      <label className='text-azulEscuro text-2xl mt-1' htmlFor='nome'>
        {label}
      </label>
      <div className='border border-cinzaMedio h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm text-azulEscuro'>
        {value}
      </div>
    </li>
  );

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
            <div className='bg-azulClaro w-10 h-10 rounded-full grid place-items-center  absolute bottom-0 right-0'>
              <div className=' bg-cinzaClaro w-8 h-8 rounded-full grid place-items-center text-azulClaro'>
                <i className='fi fi-br-picture'></i>
              </div>
            </div>
          </div>
        </div>
        <div className='ml-16'>
          <h2 className='text-xl text-VerdeMedio'>Perfil do Cliente</h2>
          <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
          <ul className='flex flex-col space-y-2'>
            {renderDetailItem(<i className='fi fi-ss-user'></i>, cliente.nome)}
            {renderDetailItem(<i className='fi fi-sr-id-badge'></i>, cliente.cpf)}
            {renderDetailItem(<i className='fi fi-sr-calendar'></i>, cliente.dataNascimento)}
            {renderDetailItem(<i className='fi fi-sr-envelope'></i>, cliente.email)}
            {renderDetailItem(<i className='fi fi-sr-phone-flip'></i>, cliente.telefone)}
            <div className='flex '>
              <label className='text-azulEscuro text-2xl mt-1'>
                <i className='fi fi-sr-marker'></i>
              </label>
              <div className=' space-y-1'>
                <div>{renderDetailItem('', cliente.cep)}</div>
                <div>{renderDetailItem('', cliente.endereco)}</div>
                <div className='flex w-52 space-x-1'>
                  <div className='w-2/3'>
                    <div className='border border-cinzaMedio  w-full h-9 p-2 rounded-r-2xl rounded-bl-2xl text-sm text-azulEscuro'>
                      {cliente.cidade}
                    </div>
                  </div>
                  <div className=' w-1/3'>
                    <div className='border border-cinzaMedio h-9 w-full p-2 rounded-r-2xl rounded-bl-2xl text-sm text-azulEscuro'>
                      {cliente.estado}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <button onClick={onEditarClick}>Editar Cliente</button>
          <button onClick={() => deleteCliente(cliente.cpf)} className='text-red-500'>
            Excluir Cliente
          </button>
        </div>
      </div>
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
