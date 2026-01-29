'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const defaultThemeContext: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  // Инициализация состояния темы с использованием эффекта
  const [theme, setTheme] = useState<string>('light');

  // Инициализация темы из localStorage после монтирования компонента
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Функция переключения темы
  const toggleTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Сохранение новой темы в localStorage
      return newTheme;
    });
  };

  // Применение темы к документу
  useEffect(() => {
    document.body.className = theme; // Применение темы к <body>
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
