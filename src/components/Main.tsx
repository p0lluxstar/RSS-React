import React from 'react';
import styles from './Main.module.css';

interface Props {
  namePokemon: string;
}

class Main extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <main className={styles.main}>
        <div>{this.props.namePokemon}</div>
      </main>
    );
  }
}

export default Main;
