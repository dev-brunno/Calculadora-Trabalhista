import React from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes

function OpenInNewTabButton({ onClick }) {
  const abrirNovaAba = () => {
    const novaAba = window.open('', '_blank');
    if (novaAba) {
      novaAba.document.write('<html><head><title>Relatório PDF</title></head><body>');
      novaAba.document.write('<div id="report-pdf-container"></div>');
      novaAba.document.write('</body></html>');
      novaAba.document.close();
      onClick(novaAba);
    } else {
      alert(
        'Não foi possível abrir uma nova aba/janela. Verifique as configurações do seu navegador.',
      );
    }
  };

  return (
    <button className='text-3xl hover:text-azulEscuro dark:hover:text-dark2' onClick={abrirNovaAba}>
      <i className='fi fi-sr-angle-square-right'></i>
    </button>
  );
}

// Adicione a validação para a prop onClick
OpenInNewTabButton.propTypes = {
  onClick: PropTypes.func.isRequired, // onClick deve ser uma função e é obrigatório
};

export default OpenInNewTabButton;
