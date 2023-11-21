import styles from './Pokemons.module.css';
import { DataPokemonArr, StoreReducer } from '../types/interfaces';
import { useSelector } from 'react-redux';

const Pokemons = (props: DataPokemonArr) => {
  const serchValue = useSelector((state: StoreReducer) => state.searchValue);
  function showPokemon() {
    if (
      props.dataPokemon[0].namePokemon != undefined &&
      serchValue.value.length > 0
    ) {
      return (
        <div className={styles.pokemon}>
          <p>
            Pokemon name:{' '}
            <span className={styles.name}>
              {props.dataPokemon[0].namePokemon.toUpperCase()}
            </span>
          </p>
          <p>
            Pokemon type: <span></span>
          </p>
          <img src={props.dataPokemon[0].urlImg} />
        </div>
      );
    } else if (props.dataPokemon.length > 1) {
      return (
        <>
          {props.dataPokemon.map((e, index) => {
            return (
              <div className={styles.pokemon} key={index}>
                <p>
                  Pokemon name:{' '}
                  <span className={styles.name}>
                    {e.namePokemon?.toUpperCase()}
                  </span>
                </p>
                <p>
                  Pokemon type: <span>{e.typePokemon}</span>
                </p>
                <img src={e.urlImg} />
              </div>
            );
          })}
        </>
      );
    } else if (
      props.dataPokemon[0].namePokemon === undefined &&
      serchValue.value.length > 0
    ) {
      return (
        <>
          <p className={styles.errName}>There is no Pokimon with that name!</p>
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
