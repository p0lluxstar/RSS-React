import { Component } from 'react';
import styles from '../styles/loader.module.css';

class Loader extends Component {
  render() {
    return <p className={styles.loading}>Loading...</p>;
  }
}

export default Loader;
