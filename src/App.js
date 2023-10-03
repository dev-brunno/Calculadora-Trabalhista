import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calculos from './routes/Calculos.component';
import Navigation from './routes/navigation/Navigation.component';
import Home from './routes/Home.component';
import Clientes from './routes/Clientes.component';
import Contato from './routes/Contato.component';

// Importe o ClientesProvider
import { ClientesProvider } from './Context/ClientesContext'; // Substitua pelo caminho real para o seu ClientesProvider

function App() {
  return (
    <ClientesProvider>
      <div className='bg-brancoMedio dark:bg-darkPrincipal pb-100'>
        <div className='flex flex-col md:flex-row flex-nowrap font-sans h-screen'>
          <Routes>
            <Route path='/' element={<Navigation />}>
              <Route path='/calculos' element={<Calculos />} />
              <Route path='/clientes' element={<Clientes />} />
              <Route path='/home' element={<Home />} />
              <Route path='/contato' element={<Contato />} />
            </Route>
          </Routes>
        </div>
      </div>
    </ClientesProvider>
  );
}

export default App;
