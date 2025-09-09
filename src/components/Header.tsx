import styles from '../styles/header/Header.module.css';
import lightStyles from '../styles/header/LightHeader.module.css';
import darkStyles from '../styles/header/DarkHeader.module.css';
import { useContext, useState } from 'react';
import { INPUT_PLACEHOLDER } from '../constants/components';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';
import Image from 'next/image';
import { BiSearchAlt } from 'react-icons/bi';

interface IProps {
  fetchSearchData: () => void;
  onInputChange: (inputValue: string) => void;
  inputValue: string;
  onClearInput: () => void;
}

export default function Header(props: IProps): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;
  const isSearchDisabled = props.inputValue.trim().length === 0;

  const [showClearButton, setShowClearButton] = useState<boolean>(
    props.inputValue.length > 0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    props.onInputChange(value);
    setShowClearButton(value.length > 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !isSearchDisabled) {
      props.fetchSearchData();
    }
  };

  const handleClearInput = (): void => {
    props.onClearInput();
    setShowClearButton(false);
  };

  return (
    <>
      <ThemeToggle />
      <header
        className={`${styles.header} ${themeStyles.header}`}
        data-testid="header"
      >
        <Image src="/img/logo.png" width={196} height={62} alt="logo" />
        <div className={styles.search}>
          <span className={styles.apiName}>rickandmortyapi.com</span>
          <input
            className={`${styles.inputSearch} ${themeStyles.inputSearch}`}
            id="search"
            type="text"
            placeholder={INPUT_PLACEHOLDER}
            value={props.inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          {showClearButton && (
            <button className={styles.btnClear} onClick={handleClearInput}>
              &times;
            </button>
          )}
        </div>
        <button
          className={styles.btnSearch}
          onClick={props.fetchSearchData}
          disabled={isSearchDisabled}
        >
          <div>
            <BiSearchAlt />
          </div>
        </button>
      </header>
    </>
  );
}
