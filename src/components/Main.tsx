import React from 'react';
import styles from './Main.module.css';
import { DataPokemon } from '../types/interfaces';

class Main extends React.Component<DataPokemon> {
  constructor(props: DataPokemon) {
    super(props);
  }

  showPokemon() {
    if (this.props.dataPokemon[0].err) {
      return (
        <p className={styles.errName}>There is no Pokimon with that name!</p>
      );
    } else if (this.props.dataPokemon.length === 1) {
      return (
        <div className={styles.pokemon}>
          <p>Name pokemon: {this.props.dataPokemon[0].namePokemon}</p>
          <p>Type pokemon: {this.props.dataPokemon[0].typePokemon}</p>
          <img src={this.props.dataPokemon[0].urlImg} />
        </div>
      );
    } else {
      return (
        <>
          {this.props.dataPokemon.map((e, index) => {
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

  render() {
    return <main className={styles.main}>{this.showPokemon()}</main>;
  }
}

export default Main;
