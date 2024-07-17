import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTheme } from '../redux/slices/themeSlice';
import styles from '../styles/themeSwitcher/ThemeSwitcher.module.css';
import lightStyles from '../styles/themeSwitcher/LightThemeSwitcher.module.css';
import darkStyles from '../styles/themeSwitcher/DarkThemeSwitcher.module.css';

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const themeStyles = theme === 'light' ? lightStyles : darkStyles;

  const handleToggleTheme = (): void => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`${styles.themeSwitcher} ${themeStyles.themeSwitcher}`}>
      <button onClick={handleToggleTheme}>
        {theme === 'light' ? '🌒︎' : '☀︎'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
