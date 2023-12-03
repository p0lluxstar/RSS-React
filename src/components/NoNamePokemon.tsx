import styles from './NoNamePokemon.module.css';

const NoNamePokemon = () => {
  return (
    <>
      <div>
        {<p className={styles.errName}>There is no Pokimon with that name!</p>}
      </div>
    </>
  );
};

export default NoNamePokemon;
