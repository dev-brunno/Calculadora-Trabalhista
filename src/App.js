import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Calculos from './routes/calculos.component';
import Home from './routes/home.component.jsx';
import Clientes from './routes/clientes.component.jsx';
import Contato from './routes/contato.component.jsx';
import { ClientesProvider } from './Context/ClientesContext';
import LoginPage from './login/LoginPage';
import RegisterPage from './login/RegisterPage';
import AuthLayout from './login/AuthLayout';
import { AuthProvider } from './Context/AuthProvider'; // Importe o AuthProvider
import PrivateRoute from './login/PrivateRoute'; // Importe o PrivateRoute
import UserProfile from './routes/UserProfile.component';
import ForgotPasswordPage from './login/ForgotPasswordPage';

function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    // Simule o carregamento do aplicativo (você pode substituir isso por um carregamento real)
    setTimeout(() => {
      setAppLoaded(true);
    }, 2000); // Simule o carregamento durante 2 segundos (ajuste conforme necessário)
  }, []);

  return (
    <AuthProvider>
      <ClientesProvider>
        <div className='bg-brancoMedio dark:bg-darkPrincipal'>
          <div className='flex flex-col md:flex-row flex-nowrap font-sans lg:h-screen'>
            {appLoaded ? (
              <Routes>
                <Route
                  path='/login'
                  element={
                    <AuthLayout>
                      <LoginPage />
                    </AuthLayout>
                  }
                />
                <Route
                  path='/register'
                  element={
                    <AuthLayout>
                      <RegisterPage />
                    </AuthLayout>
                  }
                />
                <Route
                  path='/esqueciasenha'
                  element={
                    <AuthLayout>
                      <ForgotPasswordPage />
                    </AuthLayout>
                  }
                />
                <Route exact path='/' element={<PrivateRoute />}>
                  <Route exact path='/' element={<Navigation />}>
                    <Route path='/calculos' element={<Calculos />} />
                    <Route path='/clientes' element={<Clientes />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/contato' element={<Contato />} />
                    <Route path='/perfil' element={<UserProfile />} />
                  </Route>
                </Route>
              </Routes>
            ) : (
              // Exibir tela de carregamento enquanto o aplicativo estiver carregando
              <div className='text-center mt-5'>
                <p>Carregando...</p>
              </div>
            )}
          </div>
        </div>
      </ClientesProvider>
    </AuthProvider>
  );
}

export default App;
