import Header from '../components/Header';
import ManyPokemons from '../components/ManyPokemons';
import OnePokemon from '../components/OnePokemon';
import { Provider } from 'react-redux';
import store from '../redux/store';

import { useState } from 'react';

export default function Page() {
  let valueSearch = '';

  if (typeof window !== 'undefined') {
    localStorage.setItem('searchValue', '');
    localStorage.setItem('numPaginationPage', '1');

    const value = localStorage.getItem('searchValue');
    if (value) {
      valueSearch = value;
    }
  }

  const [count, setCount] = useState(0);

  function updateComponentMain() {
    setCount(count + 1);
  }

  return (
    <>
      <Provider store={store}>
        <Header clickOnSearch={updateComponentMain} />
        {valueSearch === '' && <ManyPokemons numPaginationPage={1} />}
        {valueSearch != '' && <OnePokemon />}
      </Provider>
    </>
  );
}
