import React, { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Switcher from '../../darkmode/Switcher';

export default function Navigation() {
  return (
    <Fragment>
      <div className='left-0 top-0 w-52 shrink-0'>
        <div className='flex h-full bg-azulEscuro dark:bg-slate-800 w-full rounded-r-3xl'>
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
              <Link to='/home' className='pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-2'>
                <div>
                  <i className='fi fi-rr-home'></i>
                </div>
                <h4 className=' text-base'>Home</h4>
              </Link>
              <Link
                to='/calculos'
                className=' pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-2'
              >
                <div>
                  <i className='fi fi-rr-calculator'></i>
                </div>
                <h4 className=' text-base'>Cálculos</h4>
              </Link>
              <Link
                to='/clientes'
                className=' pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-2'
              >
                <div>
                  <i className='fi fi-rr-users-alt'></i>
                </div>
                <h4 className=' text-base'>Clientes</h4>
              </Link>
              <Link
                to='/contato'
                className=' pl-4 p-2 hover:bg-azulClaro flex items-center space-x-2'
              >
                <div>
                  <i className='fi fi-rr-lightbulb-question'></i>
                </div>
                <h4 className=' text-base'>Entre em contato </h4>
              </Link>
            </div>
            <div className='text-xl pt-4'>
              <Link to='' className=' pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-2'>
                <div>
                  <i className='fi fi-rr-sign-out-alt'></i>
                </div>
                <h4 className=' text-sm'>Logout</h4>
              </Link>
              <Link to='' className=' pl-4 p-2 hover:bg-azulClaro flex items-center  space-x-3'>
                <div>
                  <i className='fi fi-rr-moon-stars'></i>
                </div>
                <h4 className=' text-sm'>Dark Mode</h4>
                <div>
                  <Switcher />
                </div>
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}
