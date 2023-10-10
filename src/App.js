import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/Navigation.component';
import Calculos from './routes/Calculos.component';
import Home from './routes/Home.component';
import Clientes from './routes/Clientes.component';
import Contato from './routes/Contato.component';
import { ClientesProvider } from './Context/ClientesContext';
import LoginPage from './login/LoginPage';
import RegisterPage from './login/RegisterPage';
import AuthLayout from './login/AuthLayout';
import { AuthProvider } from './Context/AuthProvider'; // Importe o AuthProvider
import PrivateRoute from './login/PrivateRoute'; // Importe o PrivateRoute

import FGTSCalculator from './Classes/Calculos/FGTSCalculator';

const periodoInicial = '2023-01-27'; // Data de início do período
const periodoFinal = '2023-12-28'; // Data de fim do período
const salarioMensal = 3000.0; // Salário mensal

try {
  const fgtsCalculator = new FGTSCalculator(periodoInicial, periodoFinal, salarioMensal);
  const resultadosFGTS = fgtsCalculator.calcularFGTS();
  console.log(resultadosFGTS);
} catch (error) {
  console.error(error.message);
}

// import RescisaoContratoCalculator from './Classes/Calculos/RescisaoContratoCalculator';

// // Fornecer os parâmetros necessários
// const inicioContrato = '2020-06-03'; // Substitua com a data de início do contrato
// const fimContrato = '2023-03-14'; // Substitua com a data de fim do contrato
// const remuneracaoUltima = 3000; // Substitua com a última remuneração
// const descontos = 0; // Substitua com o valor dos descontos
// const depositoFGTS = 2000; // Substitua com o valor do depósito do FGTS

// // Criar uma instância da classe RescisaoContratoCalculator
// const calculadoraRescisao = new RescisaoContratoCalculator(
//   inicioContrato,
//   fimContrato,
//   remuneracaoUltima,
//   descontos,
//   depositoFGTS,
// );

// // Calcular a rescisão
// const resultadoRescisao = calculadoraRescisao.calcularRescisao();

// // Exibir o resultado
// console.log(resultadoRescisao);

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
        <div className='bg-brancoMedio dark:bg-darkPrincipal pb-100'>
          <div className='flex flex-col md:flex-row flex-nowrap font-sans h-screen'>
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
                <Route exact path='/' element={<PrivateRoute />}>
                  <Route exact path='/' element={<Navigation />}>
                    <Route path='/calculos' element={<Calculos />} />
                    <Route path='/clientes' element={<Clientes />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/contato' element={<Contato />} />
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
