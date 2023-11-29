/* import styles from './ManyPokemons.module.css'; */
import { useEffect, useState } from 'react';
import { useGetManyPokemonsQuery } from '../redux/slices/apiSlice';
import {
  GetManyPokemons,
  GetOnePokemon,
  ArrWithDataUrlPokemons,
} from '../types/interfaces';
import Loader from './loader';
import Pagination from './Pagination';
import { LayoutPokemon } from './LayoutPokemon';
import { DEFAULT_QUANTITY_ALL_POKEMONS } from '../const/const';

interface NumPaginationPage {
  numPaginationPage: number;
}

const ManyPokemons = (props: NumPaginationPage) => {
  const [arrayDataPokemons, setArrayDataPokemons] =
    useState<ArrWithDataUrlPokemons>({ dataPokemon: [] });

  const [, setOffsetQuantityPokemon] = useState(
    props.numPaginationPage * 20 - 20
  );

  const { data: getDataManyPokemons, isFetching } = useGetManyPokemonsQuery(
    props.numPaginationPage * 20 - 20
  );

  const getManyPokemons: GetManyPokemons = getDataManyPokemons;

  useEffect(() => {
    creatArrayDataPokemons();
  }, [isFetching, props]);

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
      <div className={'pokemons'}>
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
      {isFetching && <Loader />} {!isFetching && showManyPokemons()}
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
