import { useState } from 'react';
import styles from '../styles/Header.module.css';

interface IProps {
  fetchSearchData: () => void;
  onInputChange: (inputValue: string) => void;
  inputValue: string;
  onClearInput: () => void; // Добавлено
}

const INPUT_PLACEHOLDER = 'Enter name card. Example: Rick';

export default function Header(props: IProps): JSX.Element {
  const [showClearButton, setShowClearButton] = useState<boolean>(
    props.inputValue.length > 0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    props.onInputChange(value);
    setShowClearButton(value.length > 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      props.fetchSearchData();
    }
  };

  const handleClearInput = (): void => {
    props.onClearInput();
    setShowClearButton(false);
  };

  return (
    <>
      <header className={styles.header} data-testid="header">
        <div className={styles.search}>
          <span className={styles.apiName}>rickandmortyapi.com</span>
          <input
            id="search"
            type="text"
            placeholder={INPUT_PLACEHOLDER}
            value={props.inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          {showClearButton && (
            <button
              className={styles.btnClear}
              onClick={handleClearInput}
              aria-label="Clear input"
            >
              &times;
            </button>
          )}
        </div>
        <button className={styles.btnSearch} onClick={props.fetchSearchData}>
          Search
        </button>
      </header>
    </>
  );
}
