import React, { Fragment, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Switcher from '../../darkmode/Switcher';
import { useAuth } from '../../Context/AuthProvider'; // Substitua pelo caminho correto para o useAuth

export default function Navigation() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const { signout } = useAuth();

  return (
    <Fragment>
      {/* Menu principal */}
      <div className=' md:w-56 w-screen flex-grow-0'>
        <div className='grid h-full bg-azulEscuro dark:bg-dark1 w-full md:rounded-r-3xl'>
          {/* Ícone do menu para telas menores */}
          <div
            className={`md:hidden flex text-branco  ${
              menuVisible ? ' justify-end' : ' justify-between'
            } md:block`}
          >
            <div
              className={`flex space-x-2 items-center pl-4 pt-4 pb-4   ${
                menuVisible ? 'hidden' : 'block'
              } md:block`}
            >
              <div className=' text-5xl bg-azulClaro dark:bg-dark2 rounded-full p-2'>
                <i className='fi fi-rr-circle-user align-middle flex justify-center'></i>
              </div>
              <h3 className=' text-sm font-medium leading-none'>
                <i>
                  Nome <br></br> do Usuário
                </i>
              </h3>
            </div>
            <button
              className='p-2 text-branco text-3xl justify-self-end mr-4 mt-4'
              onClick={toggleMenu}
            >
              <i className={`fi ${menuVisible ? 'fi-br-cross-small' : 'fi-sr-menu-burger bg'}`}></i>
            </button>
          </div>

          <nav className={`${menuVisible ? 'block' : 'hidden'} md:block`}>
            <div className='h-full text-branco divide-y dark:divide-dark3 flex flex-col'>
              <div className='flex space-x-2 items-center pl-4 pt-4 pb-4 '>
                <div className=' text-5xl bg-azulClaro dark:bg-dark2 rounded-full p-2'>
                  <i className='fi fi-rr-circle-user align-middle flex justify-center'></i>
                </div>
                <h3 className=' text-sm font-medium leading-none'>
                  <i>
                    Nome <br></br> do Usuário
                  </i>
                </h3>
              </div>

              <div className=' text-2xl flex-grow flex flex-col justify-center'>
                <Link
                  to='/home'
                  className='pl-4 p-2 hover:bg-azulClaro dark:hover:bg-dark4 flex items-center  space-x-2'
                >
                  <div>
                    <i className='fi fi-rr-home'></i>
                  </div>
                  <h4 className=' text-base'>Home</h4>
                </Link>
                <Link
                  to='/calculos'
                  className=' pl-4 p-2 hover:bg-azulClaro dark:hover:bg-dark4 flex items-center  space-x-2'
                >
                  <div>
                    <i className='fi fi-rr-calculator'></i>
                  </div>
                  <h4 className=' text-base'>Cálculos</h4>
                </Link>
                <Link
                  to='/clientes'
                  className=' pl-4 p-2 hover:bg-azulClaro dark:hover:bg-dark4 flex items-center  space-x-2'
                >
                  <div>
                    <i className='fi fi-rr-users-alt'></i>
                  </div>
                  <h4 className=' text-base'>Clientes</h4>
                </Link>
                <Link
                  to='/contato'
                  className=' pl-4 p-2 hover:bg-azulClaro dark:hover:bg-dark4 flex items-center space-x-2'
                >
                  <div>
                    <i className='fi fi-rr-lightbulb-question'></i>
                  </div>
                  <h4 className=' text-base'>Entre em contato </h4>
                </Link>
              </div>

              <div className='text-xl pt-4 pb-4'>
                <Link
                  to=''
                  className=' pl-4 p-2 hover:bg-azulClaro dark:hover:bg-dark4 flex items-center  space-x-2'
                  onClick={() => signout()}
                >
                  <div>
                    <i className='fi fi-rr-sign-out-alt'></i>
                  </div>
                  <h4 className=' text-sm'>Logout</h4>
                </Link>
                <div
                  to=''
                  className=' pl-4 p-2 hover:bg-azulClaro dark:hover:bg-dark4 flex items-center  space-x-3'
                >
                  <Switcher></Switcher>
                  <h4 className=' text-sm'>Dark Mode</h4>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}
