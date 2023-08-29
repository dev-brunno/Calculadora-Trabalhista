import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calculos from './routes/calculos.component';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home.component';
import Clientes from './routes/clientes.component';
import Contato from './routes/contato.component';

function App() {
  return (
    <div className='flex flex-nowrap font-sans h-screen bg-brancoMedio'>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route path='/calculos' element={<Calculos />} />
          <Route path='/home' element={<Home />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/contato' element={<Contato />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
