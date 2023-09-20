import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calculos from './routes/calculos.component';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home.component';
import Clientes from './routes/clientes.component';
import Contato from './routes/contato.component';

// Importe o ClientesProvider
import { ClientesProvider } from './Context/ClientesContext'; // Substitua pelo caminho real para o seu ClientesProvider

function App() {
  return (
    <ClientesProvider>
      <div className='flex flex-nowrap font-sans h-screen'>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route path='/calculos' element={<Calculos />} />
            <Route path='/clientes' element={<Clientes />} />
            <Route path='/home' element={<Home />} />
            <Route path='/contato' element={<Contato />} />
          </Route>
        </Routes>
      </div>
    </ClientesProvider>
  );
}

export default App;
