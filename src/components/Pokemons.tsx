import styles from './Pokemons.module.css';

interface Props {
  dataPokemon: Array<{
    namePokemon?: string;
    typePokemon?: string;
    urlImg?: string;
    err?: boolean;
  }>;
}

const Pokemons = (props: Props) => {
  function showPokemon() {
    if (
      props.dataPokemon.length === 1 &&
      props.dataPokemon[0].namePokemon === undefined
    ) {
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

  return (
    <section className={styles.main}>
      <div className={styles.pokemons}>{showPokemon()}</div>
    </section>
  );
};

export default Pokemons;
