import React from 'react';
import styles from '../styles/Cards.module.css';
import { IDataFetch } from '../types/interfaces';

interface IProps {
  dataFetch: IDataFetch[];
}

class Cards extends React.Component<IProps> {
  render() {
    const { dataFetch } = this.props;

    if (dataFetch.length === 0) {
      return;
    }

    if (dataFetch[0].name != '') {
      return (
        <div className={styles.cards}>
          {dataFetch.map((e, index) => (
            <div className={styles.card} key={index}>
              <img src={e.image} alt={e.name}></img>
              <p>Name: {e.name}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return <p className={styles.message}>There is no card with that name.</p>;
    }
  }
}

export default Cards;
