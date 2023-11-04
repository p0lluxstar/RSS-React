import styles from './Main.module.css';
import { DataPokemon } from '../types/interfaces';

const Main = (props: DataPokemon) => {
  function showPokemon() {
    if (props.dataPokemon[0].err) {
      return (
        <p className={styles.errName}>There is no Pokimon with that name!</p>
      );
    } else if (props.dataPokemon.length === 1) {
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

  return <main className={styles.main}>{showPokemon()}</main>;
};

export default Main;
