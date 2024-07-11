import React from 'react';
import styles from '../styles/Main.module.css';
import Cards from './Cards';
import { IDataFetch } from '../types/interfaces';

interface IProps {
  dataFetch: IDataFetch[];
}

class Main extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <main className={styles.main}>
        <Cards dataFetch={this.props.dataFetch} />
      </main>
    );
  }
}

export default Main;
