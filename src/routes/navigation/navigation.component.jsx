import React, { Fragment, useState, useEffect } from 'react'; // Importe também useEffect
import { Outlet, Link } from 'react-router-dom';
import Switcher from '../../darkmode/Switcher';
import { useAuth } from '../../Context/AuthProvider';
import firebase from '../../Firebase/firebase'; // Importe o Firebase
import 'firebase/firestore'; // Importe o Firestore
import LogoutConfirmationDialog from '../../components/InterfaceComponents/LogoutConfirmationDialog.componet';

export default function Navigation() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { user, signout } = useAuth();
  const [username, setUsername] = useState('');
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = firebase.firestore().collection('users').doc(user.uid);
          const userDocSnapshot = await userDocRef.get();

          if (userDocSnapshot.exists) {
            const userData = userDocSnapshot.data();
            setUsername(userData.username);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true); // Abre o diálogo de confirmação de logout
  };

  const confirmLogout = () => {
    setIsLogoutDialogOpen(false); // Fecha o diálogo de confirmação de logout
    signout(); // Realiza o logout do usuário
  };

  return (
    <Fragment>
      <div className=' md:w-56 w-screen flex-grow-0'>
        <div className='grid h-full bg-azulEscuro dark:bg-dark1 w-full md:rounded-r-3xl'>
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
              <h3 className=' text-sm font-medium leading-none whitespace-pre-wrap'>
                <i>{username}</i>
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
                <h3 className=' text-sm font-medium leading-none w-20'>
                  <i>{username}</i>
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
                  onClick={handleLogoutClick}
                >
                  <div>
                    <i className='fi fi-rr-sign-out-alt'></i>
                  </div>
                  <h4 className=' text-sm'>Logout</h4>
                </Link>
                {/* Renderize o diálogo de confirmação de logout */}
                <LogoutConfirmationDialog
                  isOpen={isLogoutDialogOpen}
                  onClose={() => setIsLogoutDialogOpen(false)} // Feche o diálogo de confirmação
                  onConfirm={confirmLogout} // Realize o logout quando o usuário confirmar
                />
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
