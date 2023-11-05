import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Main from './Main';
import Pagination from './Pagination';
import Loader from './loader';
import { getManyPokemons, getPokemon, DataPokemon } from '../types/interfaces';

const offsetPokemon = 0;

const Header = () => {
  const [inputValue, setInputValue] = useState('');
  const [dataPokemon, setDataPokemon] = useState<DataPokemon>({
    dataPokemon: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPokemon();
  }, []);

  function getPokemon() {
    const valueInputFromLocalStorage = localStorage.getItem('lastSearch');

    if (!valueInputFromLocalStorage) {
      const newArr: Array<{
        namePokemon: string;
        typePokemon: string;
        urlImg: string;
        err: boolean;
      }> = [];
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
                newArr.push({
                  namePokemon: data.name,
                  typePokemon: data.types[0].type.name,
                  urlImg: data.sprites.other.dream_world.front_default,
                  err: false,
                })
              );
          });
          const arrManyPokemon = () => {
            setDataPokemon({ dataPokemon: newArr });
            setIsLoading(true);
          };
          setTimeout(arrManyPokemon, 300);
        })
        .catch(() => {});
    } else {
      setInputValue(valueInputFromLocalStorage);
      fetch(`https://pokeapi.co/api/v2/pokemon/${valueInputFromLocalStorage}`)
        .then((response) => {
          return response.json();
        })
        .then((data: getPokemon) => {
          setDataPokemon({
            dataPokemon: [
              {
                namePokemon: data.name,
                urlImg: data.sprites.other.dream_world.front_default,
                typePokemon: data.types[0].type.name,
                err: false,
              },
            ],
          });
          setIsLoading(true);
        })
        .catch(() => {
          setDataPokemon({
            dataPokemon: [
              {
                namePokemon: '',
                typePokemon: '',
                urlImg: '',
                err: true,
              },
            ],
          });
          setIsLoading(true);
        });
    }
  }

  function getPokemonSearch() {
    setIsLoading(false);
    if (inputValue === '') {
      localStorage.setItem('lastSearch', '');
      getPokemon();
    } else {
      localStorage.setItem('lastSearch', inputValue);
      fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`)
        .then((response) => {
          return response.json();
        })
        .then((data: getPokemon) => {
          setDataPokemon({
            dataPokemon: [
              {
                namePokemon: data.name,
                urlImg: data.sprites.other.dream_world.front_default,
                typePokemon: data.types[0].type.name,
                err: false,
              },
            ],
          });
          setIsLoading(true);
        })
        .catch(() => {
          setDataPokemon({
            dataPokemon: [
              {
                namePokemon: '',
                typePokemon: '',
                urlImg: '',
                err: true,
              },
            ],
          });
          setIsLoading(true);
        });
    }
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
          <Pagination />
          <Main dataPokemon={dataPokemon.dataPokemon} />
        </>
      )}
    </>
  );
};

export default Header;
