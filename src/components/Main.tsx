import React from 'react';
import styles from './Main.module.css';
import Cards from './Cards';

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

  render() {
    return (
      <main className={styles.main}>
        <Cards dataFetch={this.props.dataFetch} />
      </main>
    );
  }
}

export default Main;
