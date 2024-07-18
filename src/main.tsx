import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import './main.css';
import lightStyles from '../src/styles/app/lightTheme.module.css';
import darkStyles from '../src/styles/app/darkTheme.module.css';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';

const Root = (): JSX.Element => {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <div className={`${themeStyles.app}`}>
      <App />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
