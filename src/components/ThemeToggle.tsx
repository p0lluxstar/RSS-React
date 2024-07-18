import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import styles from '../styles/themeToggle/ThemeToggle.module.css';
import lightStyles from '../styles/themeToggle/LightThemeToggle.module.css';
import darkStyles from '../styles/themeToggle/DarkThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <div className={`${styles.themeToggle} ${themeStyles.themeToggle}`}>
      <button onClick={themeContext.toggleTheme}>
        {themeContext.theme === 'light' ? '🌒︎' : '☀︎'}
      </button>
    </div>
  );
};

export default ThemeToggle;
