import React from 'react';
import styles from './Main.module.css';

interface DataFetch {
  name: string;
  image: string;
}

interface MainProps {
  dataFetch: DataFetch[];
}

class Main extends React.Component<MainProps> {
  constructor(props: MainProps) {
    super(props);
  }

  showDataFetch() {
    if (this.props.dataFetch) {
      return (
        <>
          {this.props.dataFetch.map((e, index) => (
            <div className={styles.card} key={index}>
              <img src={e.image}></img>
              <p>Name: {e.name}</p>
            </div>
          ))}
        </>
      );
    }
  }

  render() {
    return (
      <main className={styles.main}>
        <div className={styles.cards}>{this.showDataFetch()}</div>
      </main>
    );
  }
}

export default Main;
