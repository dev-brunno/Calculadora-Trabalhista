import React from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes

function LogoutConfirmationDialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50'>
      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <p className=' text-black'>Tem certeza de que deseja fazer logout?</p>
        <div className='mt-4 flex justify-end'>
          <button
            onClick={() => {
              onClose();
            }}
            className='text-gray-600 mr-2 bg-gray-100 p-2 rounded-md'
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
            }}
            className='text-red-500 mr-2 bg-gray-100 p-2 rounded-md'
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

// Adicione PropTypes para validar as propriedades
LogoutConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default LogoutConfirmationDialog;
