import React from 'react';
import styles from './Main.module.css';

interface DataFetch {
  name: string;
  image: string;
}

interface CardsProps {
  dataFetch: DataFetch[];
}

class Cards extends React.Component<CardsProps> {
  constructor(props: CardsProps) {
    super(props);
  }

  render() {
    if (this.props.dataFetch.length > 0) {
      return (
        <div className={styles.cards}>
          {this.props.dataFetch.map((e, index) => (
            <div className={styles.card} key={index}>
              <img src={e.image} alt={e.name}></img>
              <p>Name: {e.name}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return <p className={styles.messege}>There is no card with that name.</p>;
    }
  }
}

export default Cards;
