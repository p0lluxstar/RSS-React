import { useEffect, useState, useContext } from 'react';
import styles from './Main.module.css';
import Pokemons from './Pokemons';
import Pagination from './Pagination';
import Loader from './loader';
import {
  getManyPokemons,
  getPokemon,
  DataPokemonArr,
} from '../types/interfaces';
import { useParams } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SearchValueContext from '../contexts/SearchValueContext';
import QuantityPokemoOnPageContext from '../contexts/QuantityPokemoOnPageContext';

export const Header = () => {
  const defaulCurrentAllPokemons = 200;
  const offsetPokemon = 0;

  const [inputValue, setInputValue] = useState('');
  const [dataPokemon, setDataPokemon] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAllPokemons, setCurrentAllPokemons] = useState(
    defaulCurrentAllPokemons
  );

  const QuantityPokemoOnPage = useContext(QuantityPokemoOnPageContext);
  const { searchValue } = useContext(SearchValueContext);

  useEffect(() => {
    getPokemon(offsetPokemon);
  }, []);

  function getPokemon(offsetPokemon: number) {
    setIsLoading(false);
    const numPaginationPageFromLocalStorage =
      localStorage.getItem('numPaginationPage');
    const newArr: DataPokemonArr = { dataPokemon: [] };

    if (!numPaginationPageFromLocalStorage) {
      localStorage.setItem('numPaginationPage', `1`);
    } else {
      offsetPokemon =
        Number(numPaginationPageFromLocalStorage) * QuantityPokemoOnPage -
        QuantityPokemoOnPage;
    }

    if (!searchValue) {
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
          setTimeout(arrManyPokemon, 1200);
        })
        .catch(() => {});
    } else {
      setInputValue(searchValue);
      setCurrentAllPokemons(1);
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
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
      localStorage.setItem('searchValue', '');
      getPokemon(offsetPokemon);
    } else {
      setCurrentAllPokemons(1);
      localStorage.setItem('searchValue', inputValue);
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
      defaulCurrentAllPokemons / QuantityPokemoOnPage ||
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
