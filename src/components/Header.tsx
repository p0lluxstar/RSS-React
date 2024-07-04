import React from 'react';
import styles from './Header.module.css';
import { Props } from '../types/interfaces';

interface HeaderProps {
  fetchSearch: () => void;
  onInputChange: (inputValue: string) => void;
  inputValue: string;
}

class Header extends React.Component<HeaderProps & Props> {
  placeholder: string;

  constructor(props: HeaderProps & Props) {
    super(props);

    this.placeholder = 'Enter name. Example: Rick';
  }

  render() {
    return (
      <>
        <header className={styles.header}>
          <input
            id="search"
            type="text"
            placeholder={this.placeholder}
            value={this.props.inputValue}
            onChange={(e) => {
              this.props.onInputChange(e.target.value);
            }}
          ></input>
          <button onClick={this.props.fetchSearch}>Search</button>
        </header>
      </>
    );
  }
}

export default Header;
