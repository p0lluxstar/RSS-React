import React from 'react';
import styles from './Main.module.css';

interface Props {
  dataArray: Array<{
    namePokemon: string;
    typePokemon: string;
    urlImg: string;
    err: boolean;
  }>;
}

class Main extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  showPokemon() {
    if (this.props.dataArray[0].err) {
      return (
        <p className={styles.errName}>There is no Pokimon with that name!</p>
      );
    }
    if (this.props.dataArray[0].namePokemon === '') {
      return <p className={styles.errName}>Loading...</p>;
    } else if (this.props.dataArray.length === 1) {
      return (
        <div className={styles.pokemon}>
          <p>Name pokemon: {this.props.dataArray[0].namePokemon}</p>
          <p>Type pokemon: {this.props.dataArray[0].typePokemon}</p>
          <img src={this.props.dataArray[0].urlImg} />
        </div>
      );
    } else {
      return (
        <>
          {this.props.dataArray.map((e, index) => {
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
