import styles from './MainLayoutr.module.css';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { StoreReducer } from '../types/interfaces';
import { quantityPokemoOnPageActions } from '../redux/slices/QuantityItemsOnPageSlice';
import { Search } from './Search';
import NotFoundPage from './NotFoundPage';
import OnePokemon from './OnePokemon';
import ManyPokemons from './ManyPokemons';
import { DEFAULT_QUANTITY_ALL_POKEMONS } from '../const/const';
import { DEFAULT_QUANTITY_OFFSET_POKEMONS } from '../const/const';

export const MainLayout = () => {
  let valueSearchStore = useSelector(
    (state: StoreReducer) => state.searchValue.value
  );

  if (valueSearchStore === '' && localStorage.getItem('searchValue')) {
    const value = localStorage.getItem('searchValue');
    if (value) {
      valueSearchStore = value;
    }
  }

  const dispatchFunction = useDispatch();
  const quantityPokemoOnPage = dispatchFunction(
    quantityPokemoOnPageActions.defaultQuantityItemsOnPage(
      DEFAULT_QUANTITY_OFFSET_POKEMONS
    )
  );

  const [count, setCount] = useState(0);

  function updateComponentMain() {
    setCount(count + 1);
  }

  const params = useParams();
  localStorage.setItem('numPaginationPage', `${Number(params.numPagination)}`);

  if (
    Number(params.numPagination) >
      DEFAULT_QUANTITY_ALL_POKEMONS / quantityPokemoOnPage.payload ||
    Number.isNaN(Number(params.numPagination))
  ) {
    return <NotFoundPage />;
  }

  return (
    <>
      <header className={styles.header}>
        <Search clickOnSearch={updateComponentMain} />
      </header>
      {valueSearchStore === '' && <ManyPokemons />}
      {valueSearchStore != '' && <OnePokemon />}
    </>
  );
};

export default MainLayout;
