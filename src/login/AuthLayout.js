// AuthLayout.js
import React from 'react';
import PropTypes from 'prop-types';

function AuthLayout({ children }) {
  return (
    <div className='bg-brancoMedio dark:bg-darkPrincipal pb-100'>
      <div className='font-sans h-screen'>{children}</div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node, // Validação de tipo para a propriedade 'children'
};

export default AuthLayout;
