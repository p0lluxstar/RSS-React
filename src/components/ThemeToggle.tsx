import styles from '../styles/themeToggle/ThemeToggle.module.css';
import lightStyles from '../styles/themeToggle/LightThemeToggle.module.css';
import darkStyles from '../styles/themeToggle/DarkThemeToggle.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle(): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <div className={`${styles.themeToggle} ${themeStyles.themeToggle}`}>
      <button onClick={themeContext.toggleTheme}>
        {themeContext.theme === 'light' ? '☀︎' : '☀︎'}
      </button>
    </div>
  );
}
