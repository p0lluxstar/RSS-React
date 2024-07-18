import { createContext, useState, ReactNode } from 'react';

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
  const [theme, setTheme] = useState('light');

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
