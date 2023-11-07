import { useEffect, useState } from 'react';
import styles from './Main.module.css';
import Pokemons from './Pokemons';
import Pagination from './Pagination';
import Loader from './loader';
import {
  getManyPokemons,
  getPokemon,
  DataPokemonNewArr,
} from '../types/interfaces';
import { useParams } from 'react-router';
import NotFoundPage from './NotFoundPage';

export const Header = () => {
  const defaulCurrentAllPokemons = 200;
  const offsetPokemon = 0;
  const currnPokemoOnPage = 20;

  const [inputValue, setInputValue] = useState('');
  const [dataPokemon, setDataPokemon] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAllPokemons, setCurrentAllPokemons] = useState(
    defaulCurrentAllPokemons
  );

  useEffect(() => {
    getPokemon(offsetPokemon);
  }, []);

  function getPokemon(offsetPokemon: number) {
    setIsLoading(false);
    const valueInputFromLocalStorage = localStorage.getItem('lastSearch');
    const numPaginationPageFromLocalStorage =
      localStorage.getItem('numPaginationPage');
    const newArr: DataPokemonNewArr = { dataPokemon: [] };

    if (!numPaginationPageFromLocalStorage) {
      localStorage.setItem('numPaginationPage', `1`);
    } else {
      offsetPokemon =
        Number(numPaginationPageFromLocalStorage) * currnPokemoOnPage -
        currnPokemoOnPage;
    }

    if (!valueInputFromLocalStorage) {
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
            setIsLoading(true);
          };
          setTimeout(arrManyPokemon, 500);
        })
        .catch(() => {});
    } else {
      setInputValue(valueInputFromLocalStorage);
      setCurrentAllPokemons(1);
      fetch(`https://pokeapi.co/api/v2/pokemon/${valueInputFromLocalStorage}`)
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
          setIsLoading(true);
        })
        .catch(() => {
          setDataPokemon([{}]);
          setIsLoading(true);
        });
    }
  }

  function getPokemonSearch() {
    setIsLoading(false);
    if (inputValue === '') {
      localStorage.setItem('lastSearch', '');
      getPokemon(offsetPokemon);
    } else {
      setCurrentAllPokemons(1);
      localStorage.setItem('lastSearch', inputValue);
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
          setIsLoading(true);
        })
        .catch(() => {
          setDataPokemon([{}]);
          setIsLoading(true);
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
      defaulCurrentAllPokemons / currnPokemoOnPage ||
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

export default Header;
