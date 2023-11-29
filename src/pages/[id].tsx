import Header from '../components/Header';
import ManyPokemons from '../components/ManyPokemons';
import OnePokemon from '../components/OnePokemon';
import NotFoundPage from '../components/NotFoundPage';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { useParams } from 'next/navigation';

import { useState } from 'react';

export default function Page() {
  let valueSearch = '';
  let numPaginationPage = 1;

  const params = useParams();
  if (params) {
    numPaginationPage = Number(params.id);
  }

  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('searchValue');
    if (value) {
      valueSearch = value;
    }
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('numPaginationPage', String(numPaginationPage));
  }

  const [count, setCount] = useState(0);

  function updateComponentMain() {
    setCount(count + 1);
  }

  if (numPaginationPage > 10 || Number.isNaN(numPaginationPage)) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Provider store={store}>
        <Header clickOnSearch={updateComponentMain} />
        {valueSearch === '' && (
          <ManyPokemons numPaginationPage={numPaginationPage} />
        )}
        {valueSearch != '' && <OnePokemon />}
      </Provider>
    </>
  );
}
