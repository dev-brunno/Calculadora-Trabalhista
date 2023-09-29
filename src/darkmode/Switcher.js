import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkSide from './useDarkSide';

export default function Switcher() {
  // Utiliza o hook customizado useDarkSide para gerenciar o tema
  const [colorTheme, setTheme] = useDarkSide();
  // Inicializa o estado do darkSide com base no tema atual
  const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

  // Função para alternar entre os modos claro e escuro
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme); // Atualiza o tema com base no estado atual
    setDarkSide(checked); // Atualiza o estado do darkSide
  };

  return (
    <>
      {/* Componente DarkModeSwitch do pacote react-toggle-dark-mode */}
      <DarkModeSwitch
        checked={darkSide}
        onChange={toggleDarkMode}
        size={25}
        className=' text-white'
      />
    </>
  );
}
