import { useEffect, useState } from 'react';
import styles from './Main.module.css';
import Pokemons from './Pokemons';
import Pagination from './Pagination';
import Loader from './loader';
import {
  getManyPokemons,
  getPokemon,
  DataPokemonArr,
  StoreReducer,
} from '../types/interfaces';
import { useParams } from 'react-router';
import NotFoundPage from './NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { searchValueActions } from '../redux/slices/SearchValueSlice';
import { quantityPokemoOnPageActions } from '../redux/slices/QuantityItemsOnPageSlice';
import { loadingActions } from '../redux/slices/LoadingSlice';

export const Main = () => {
  const defaulCurrentAllPokemons = 200;
  const offsetPokemon = 0;

  const [inputValue, setInputValue] = useState('');
  const [dataPokemon, setDataPokemon] = useState([{}]);
  const [currentAllPokemons, setCurrentAllPokemons] = useState(
    defaulCurrentAllPokemons
  );

  const isLoading = useSelector((state: StoreReducer) => state.loading);
  /* const isLoading = useSelector((state:StoreReducer) => state.loading) */

  const dispatchFunction = useDispatch();
  const searchValueLocalStorage = dispatchFunction(
    searchValueActions.getValueSearchLocalStorage(
      localStorage.getItem('searchValue')
    )
  );
  const quantityPokemoOnPage = dispatchFunction(
    quantityPokemoOnPageActions.defaultQuantityItemsOnPage(20)
  );

  useEffect(() => {
    getPokemon(offsetPokemon);
  }, []);

  function getPokemon(offsetPokemon: number) {
    dispatchFunction(loadingActions.isLoading(false));
    const numPaginationPageFromLocalStorage =
      localStorage.getItem('numPaginationPage');
    if (!numPaginationPageFromLocalStorage) {
      localStorage.setItem('numPaginationPage', `1`);
    } else {
      offsetPokemon =
        Number(numPaginationPageFromLocalStorage) *
          quantityPokemoOnPage.payload -
        quantityPokemoOnPage.payload;
    }

    if (localStorage.getItem('searchValue') === '') {
      const newArr: DataPokemonArr = { dataPokemon: [] };
      setCurrentAllPokemons(defaulCurrentAllPokemons);
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offsetPokemon}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data: getManyPokemons) => {
          data.results.forEach((e) => {
            fetch(e.url)
              .then((response) => {
                return response.json();
              })
              .then((data: getPokemon) =>
                newArr.dataPokemon.push({
                  namePokemon: data.name,
                  typePokemon: data.types[0].type.name,
                  urlImg: data.sprites.other.dream_world.front_default,
                  err: false,
                })
              );
          });
          const arrManyPokemon = () => {
            setDataPokemon(newArr.dataPokemon);
            dispatchFunction(loadingActions.isLoading(true));
          };
          setTimeout(arrManyPokemon, 1200);
        })
        .catch(() => {});
    } else {
      setInputValue(searchValueLocalStorage.payload);
      setCurrentAllPokemons(1);
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchValueLocalStorage.payload}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data: getPokemon) => {
          setDataPokemon([
            {
              namePokemon: data.name,
              urlImg: data.sprites.other.dream_world.front_default,
              typePokemon: data.types[0].type.name,
              err: false,
            },
          ]);
          dispatchFunction(loadingActions.isLoading(true));
        })
        .catch(() => {
          setDataPokemon([{}]);
          dispatchFunction(loadingActions.isLoading(true));
        });
    }
  }

  function getPokemonSearch() {
    dispatchFunction(loadingActions.isLoading(false));
    if (inputValue === '') {
      dispatchFunction(searchValueActions.setValueSearchLocalStorage(''));
      getPokemon(offsetPokemon);
    } else {
      setCurrentAllPokemons(1);
      dispatchFunction(
        searchValueActions.setValueSearchLocalStorage(inputValue)
      );
      fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`)
        .then((response) => {
          return response.json();
        })
        .then((data: getPokemon) => {
          setDataPokemon([
            {
              namePokemon: data.name,
              urlImg: data.sprites.other.dream_world.front_default,
              typePokemon: data.types[0].type.name,
              err: false,
            },
          ]);
          dispatchFunction(loadingActions.isLoading(true));
        })
        .catch(() => {
          setDataPokemon([{}]);
          dispatchFunction(loadingActions.isLoading(true));
        });
    }
  }

  function clickOnItemPagination(numItemPagination: number) {
    getPokemon(numItemPagination);
  }

  const params = useParams();
  localStorage.setItem('numPaginationPage', `${Number(params.numPagination)}`);
  if (
    Number(params.numPagination) >
      defaulCurrentAllPokemons / quantityPokemoOnPage.payload ||
    Number.isNaN(Number(params.numPagination))
  ) {
    return <NotFoundPage />;
  }

  return (
    <>
      <header className={styles.header}>
        <input
          id="search"
          type="text"
          placeholder="Enter pokemon name. Example: Pikachu"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button onClick={getPokemonSearch}>Search</button>
      </header>

      {!isLoading && <Loader />}
      {isLoading && (
        <>
          <Pokemons dataPokemon={dataPokemon} />
        </>
      )}
      {!(dataPokemon.length === 1) && (
        <Pagination
          currentAllPokemons={currentAllPokemons}
          clickOnItemPagination={clickOnItemPagination}
        />
      )}
    </>
  );
};

export default Main;
