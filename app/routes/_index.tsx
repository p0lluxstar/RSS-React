import { type MetaFunction } from '@remix-run/node';
import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import store from '../../src/redux/store';
import { ThemeContext, ThemeProvider } from '../../src/context/ThemeContext';
import lightStyles from '../../src/styles/root/LightTheme.module.css';
import darkStyles from '../../src/styles/root/DarkTheme.module.css';
import { useLoaderData } from 'react-router-dom';
import { api } from '../../src/utils/api';
import MainPage from '../../src/components/MainPage'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = api;

const Root = (): JSX.Element => {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  const { characters, detailsCharacter } = useLoaderData();

  return (
    <div className={`${themeStyles.root}`}>
      <MainPage
        characters={characters}
        detailsCharacter={detailsCharacter}
      />
    </div>
  );
};

export default function Index(): JSX.Element {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider>
          <Root />
        </ThemeProvider>
      </Provider>
    </div>
  );
}
