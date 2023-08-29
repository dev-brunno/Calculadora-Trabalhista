import React from 'react';
import Menus from './components/InterfaceComponents/Menus';
import NavBar from './components/InterfaceComponents/NavBar';
function App() {
  return (
    <div className='App font-sans flex flex-nowrap h-screen bg-brancoMedio'>
      <div className='left-0 top-0 w-52 shrink-0'>
        <NavBar />
      </div>
      <div>
        <div className=' pb-16 relative m-16'>
          <div className=' w-max-12/12 bg-branco shadow-lg p-12 border rounded-3xl border-solid border-cinzaMedio'>
            <Menus />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
