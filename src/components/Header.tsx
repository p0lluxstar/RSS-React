import { Component } from 'react';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <label htmlFor="search">Search</label>
        <input id="search" type="text"></input>
      </header>
    );
  }
}

export default Header;
