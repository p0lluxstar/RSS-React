import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import App from './App';
import store, { RootState } from './redux/store';
import './main.css'; // Включаем main.css
import lightThemeStyles from '../src/styles/theme/lightTheme.module.css';
import darkThemeStyles from '../src/styles/theme/darkTheme.module.css';

// Создаем компонент для обертки
const Root = (): JSX.Element => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const themeStyles = theme === 'light' ? lightThemeStyles : darkThemeStyles;

  return (
    <div className={themeStyles.app}>
      <App />
    </div>
  );
};

// Рендерим приложение
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
