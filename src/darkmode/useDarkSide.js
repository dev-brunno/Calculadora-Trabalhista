import { useState, useEffect } from 'react';

export default function useDarkSide() {
  // Inicializa o estado do tema com base nas preferências do usuário ou padrão
  const [theme, setTheme] = useState(localStorage.theme);
  // Calcula o tema oposto (light ou dark)
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove a classe do tema oposto e adiciona a classe do tema atual ao elemento root do HTML
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    // Armazena o tema atual nas preferências do usuário
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme]; // Retorna o tema atual e a função para atualizar o tema
}
