import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTheme } from '../redux/slices/themeSlice';

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleToggleTheme = (): void => {
    dispatch(toggleTheme());
  };

  return (
    <button onClick={handleToggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
};

export default ThemeSwitcher;
