import styles from './ManyPokemons.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetManyPokemonsQuery } from '../redux/slices/apiSlice';
import {
  StoreReducer,
  GetManyPokemons,
  GetOnePokemon,
  ArrWithDataUrlPokemons,
} from '../types/interfaces';
import { numPaginationPageActions } from '../redux/slices/NumPaginationPageSLice';
import { searchValueActions } from '../redux/slices/SearchValueSlice';
import Loader from './Loader';
import Pagination from './Pagination';
import { LayoutPokemon } from './LayoutPokemon';
import { DEFAULT_QUANTITY_ALL_POKEMONS } from '../const/const';
import { DEFAULT_QUANTITY_OFFSET_POKEMONS } from '../const/const';

const ManyPokemons = () => {
  const numPaginationPage = useSelector(
    (state: StoreReducer) => state.numPaginationPage.value
  );

  const quantityOffsetPokemons =
    DEFAULT_QUANTITY_OFFSET_POKEMONS * (Number(numPaginationPage) - 1);

  const dispatchFunction = useDispatch();
  dispatchFunction(
    numPaginationPageActions.setNumPagenstionPageLocalStorage(
      localStorage.getItem('numPaginationPage')
    )
  );

  dispatchFunction(searchValueActions.setValueSearchLocalStorage(''));

  const [arrayDataPokemons, setArrayDataPokemons] =
    useState<ArrWithDataUrlPokemons>({ dataPokemon: [] });
  const [offsetQuantityPokemon, setOffsetQuantityPokemon] = useState(
    quantityOffsetPokemons
  );
  const { data: getDataManyPokemons, isFetching } = useGetManyPokemonsQuery(
    offsetQuantityPokemon
  );

  const getManyPokemons: GetManyPokemons = getDataManyPokemons;

  useEffect(() => {
    creatArrayDataPokemons();
  }, [isFetching, offsetQuantityPokemon]);

  function creatArrayDataPokemons() {
    if (getManyPokemons) {
      const arrWithDataUrlPokemons: ArrWithDataUrlPokemons = {
        dataPokemon: [],
      };

      getManyPokemons.results.forEach((element) => {
        fetch(element.url)
          .then((response) => {
            return response.json();
          })
          .then((data: GetOnePokemon) => {
            arrWithDataUrlPokemons.dataPokemon.push({
              namePokemon: data.name,
              typePokemon: data.types[0].type.name,
              urlImg: data.sprites.other.dream_world.front_default,
              err: false,
            });
            if (
              getManyPokemons.results.length ===
              arrWithDataUrlPokemons.dataPokemon.length
            ) {
              setArrayDataPokemons(arrWithDataUrlPokemons);
            }
          });
      });
    }
  }

  function clickOnItemPagination(numItemPagination: number) {
    setOffsetQuantityPokemon(numItemPagination);
  }

  function showManyPokemons() {
    return (
      <div className={styles.pokemons}>
        {arrayDataPokemons.dataPokemon.map((item) => (
          <LayoutPokemon
            key={item.namePokemon}
            name={item.namePokemon}
            type={item.typePokemon}
            imgUrl={item.urlImg}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {isFetching && <Loader />}
      {!isFetching && showManyPokemons()}
      {!isFetching && (
        <Pagination
          currentAllPokemons={DEFAULT_QUANTITY_ALL_POKEMONS}
          clickOnItemPagination={clickOnItemPagination}
        />
      )}
    </>
  );
};

export default ManyPokemons;
