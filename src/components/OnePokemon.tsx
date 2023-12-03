import styles from './OnePokemon.module.css';
import { useGetOnePokemonQuery } from '../redux/slices/apiSlice';
import { GetOnePokemon, StoreReducer } from '../types/interfaces';
import { useSelector } from 'react-redux';
import NoNamePokemon from './NoNamePokemon';
import Loader from './Loader';
import { LayoutPokemon } from './LayoutPokemon';

const OnePokemon = () => {
  const valueSearchStore = useSelector(
    (state: StoreReducer) => state.searchValue.value
  );

  const {
    data: getDataOnePokemon,
    isFetching,
    isError,
  } = useGetOnePokemonQuery(valueSearchStore.toLowerCase());

  function showOnePokemon() {
    const data: GetOnePokemon = getDataOnePokemon;
    return (
      <div className={styles.pokemons}>
        <LayoutPokemon
          key={data.name}
          name={data.name}
          type={data.types[0].type.name}
          imgUrl={data.sprites.other.dream_world.front_default}
        />
      </div>
    );
  }

  return (
    <>
      {isFetching && <Loader />}
      {!isFetching && !isError && showOnePokemon()}
      {isError && <NoNamePokemon />}
    </>
  );
};

export default OnePokemon;
