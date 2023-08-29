import React from 'react';

export default function NavBar() {
  return (
    <div className='flex h-full bg-azulEscuro w-full rounded-r-3xl'>
      <nav className=' text-branco grid grid-cols-1 divide-y leading-none w-full'>
        <div className='flex space-x-2 items-center pl-4'>
          <div className=' text-5xl bg-azulClaro rounded-full border-2 border-azulClaro'>
            <i className='fi fi-sr-circle-user align-middle flex justify-center'></i>
          </div>
          <h3 className=' text-sm font-medium leading-none'>
            <i>
              Nome <br></br> do Usuário
            </i>
          </h3>
        </div>
        <div className=' row-span-4 pt-12 text-2xl'>
          <a href='#' className='pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-2'>
            <div>
              <i className='fi fi-rr-home'></i>
            </div>
            <h4 className=' text-base'>Home</h4>
          </a>
          <a href='#' className=' pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-2'>
            <div>
              <i className='fi fi-rr-calculator'></i>
            </div>
            <h4 className=' text-base'>Cálculos</h4>
          </a>
          <a href='#' className=' pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-2'>
            <div>
              <i className='fi fi-rr-users-alt'></i>
            </div>
            <h4 className=' text-base'>Clientes</h4>
          </a>
          <a href='#' className=' pl-4 p-2 hover:bg-azulClaro flex items-center space-x-2'>
            <div>
              <i className='fi fi-rr-lightbulb-question'></i>
            </div>
            <h4 className=' text-base'>Entre em contato </h4>
          </a>
        </div>
        <div className='text-xl pt-4'>
          <a href='#' className=' pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-2'>
            <div>
              <i className='fi fi-rr-sign-out-alt'></i>
            </div>
            <h4 className=' text-sm'>Logout</h4>
          </a>
          <a href='#' className=' pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-3'>
            <div>
              <i className='fi fi-rr-moon-stars'></i>
            </div>
            <h4 className=' text-sm'>Dark Mode</h4>
            <div>
              <i className='fi fi-rr-toggle-on'></i>
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
}
