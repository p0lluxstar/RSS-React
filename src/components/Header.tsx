import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Main from './Main';
import Pagination from './Pagination';
import Loader from './loader';
import {
  getManyPokemons,
  getPokemon,
  DataPokemonNewArr,
} from '../types/interfaces';

export const Header = () => {
  const defaulCurrentAllPokemons = 200;
  const offsetPokemon = 0;

  const [inputValue, setInputValue] = useState('');
  const [dataPokemon, setDataPokemon] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAllPokemons, setCurrentAllPokemons] = useState(
    defaulCurrentAllPokemons
  );

  useEffect(() => {
    getPokemon(offsetPokemon);
  }, []);

  function getPokemon(offset: number) {
    const valueInputFromLocalStorage = localStorage.getItem('lastSearch');
    const newArr: DataPokemonNewArr = { dataPokemon: [] };

    if (!valueInputFromLocalStorage) {
      setCurrentAllPokemons(defaulCurrentAllPokemons);
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
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
          {!(Object.keys(dataPokemon[0]).length === 0) && (
            <Pagination
              currentAllPokemons={currentAllPokemons}
              clickOnItemPagination={clickOnItemPagination}
            />
          )}

          <Main dataPokemon={dataPokemon} />
        </>
      )}
    </>
  );
};

export default Header;
