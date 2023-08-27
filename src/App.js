import React from 'react';
import Menus from './components/Menus';

function App() {
  return (
    <div className='App font-sans mt-6'>
      <div className=' shadow-sm p-8 max-w-screen-lg mx-auto h-96 w-2/3 border rounded-3xl border-solid border-cinzaMedio'>
        <h2 className=' mb-6 text-2xl text-VerdeMedio'>Cálculos recentes</h2>
        <Menus />
      </div>
    </div>
  );
}

export default App;
