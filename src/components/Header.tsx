import React from 'react';
import styles from '../styles/Header.module.css';

interface IProps {
  fetchSearch: () => void;
  onInputChange: (inputValue: string) => void;
  inputValue: string;
  isInputEmpty: boolean;
}

class Header extends React.Component<IProps> {
  placeholder: string;

  constructor(props: IProps) {
    super(props);

    this.placeholder = 'Enter name card. Example: Rick';
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.fetchSearch(); // Вызываем функцию fetchSearch из props
    }
  };

  render() {
    return (
      <>
        <header className={styles.header}>
          <div className={styles.search}>
            <span className={styles.apiName}>rickandmortyapi.com</span>
            <input
              id="search"
              type="text"
              placeholder={this.placeholder}
              value={this.props.inputValue}
              onChange={(e) => {
                this.props.onInputChange(e.target.value);
              }}
              onKeyDown={this.handleKeyPress}
              className={this.props.isInputEmpty ? styles.inputError : ''}
            />
            <button
              className={styles.btnSearch}
              onClick={this.props.fetchSearch}
            >
              Search
            </button>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
