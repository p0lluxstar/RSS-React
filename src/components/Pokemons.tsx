import styles from './Pokemons.module.css';
import { DataPokemonArr, StoreReducer } from '../types/interfaces';
import { useSelector } from 'react-redux';

const Pokemons = (props: DataPokemonArr) => {
  const serchValue = useSelector((state: StoreReducer) => state.searchValue);
  function showPokemon() {
    if (
      props.dataPokemon.length === 1 &&
      props.dataPokemon[0].namePokemon === undefined &&
      serchValue.value.length > 0
    ) {
      return (
        <p className={styles.errName}>There is no Pokimon with that name!</p>
      );
    } else if (props.dataPokemon.length === 1 && serchValue.value.length > 0) {
      return (
        <div className={styles.pokemon}>
          <p>Name pokemon: {props.dataPokemon[0].namePokemon}</p>
          <p>Type pokemon: {props.dataPokemon[0].typePokemon}</p>
          <img src={props.dataPokemon[0].urlImg} />
        </div>
      );
    } else {
      return (
        <>
          {props.dataPokemon.map((e, index) => {
            return (
              <div className={styles.pokemon} key={index}>
                <p>Name pokemon: {e.namePokemon}</p>
                <p>Type pokemon: {e.typePokemon}</p>
                <img src={e.urlImg} />
              </div>
            );
          })}
        </>
      );
    }
  }

  return (
    <section className={styles.main}>
      <div className={styles.pokemons}>{showPokemon()}</div>
    </section>
  );
};

export default Pokemons;
