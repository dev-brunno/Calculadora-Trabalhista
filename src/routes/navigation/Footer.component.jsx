import React from 'react';

export default function Footer() {
  return (
    <footer className='bg-white shadow dark:bg-gray-800'>
      <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2023{' '}
          <a href='#' className='hover:underline'>
            Bruno Sampaio
          </a>
          . Todos os direitos reservados.
        </span>
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <li>
            <a href='#' className='mr-4 hover:underline md:mr-6 '>
              Sobre
            </a>
          </li>
          <li>
            <a href='#' className='mr-4 hover:underline md:mr-6'>
              Política de Privacidade
            </a>
          </li>
          <li>
            <a href='#' className='mr-4 hover:underline md:mr-6'>
              Licenciamento
            </a>
          </li>
          <li>
            <a href='#' className='hover:underline'>
              Contato
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
