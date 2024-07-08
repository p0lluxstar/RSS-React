import styles from '../styles/Header.module.css';

interface IProps {
  fetchSearchData: () => void;
  onInputChange: (inputValue: string) => void;
  inputValue: string;
}

const INPUT_PLACEHOLDER = 'Enter name card. Example: Rick';

export default function Header(props: IProps): JSX.Element {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      props.fetchSearchData();
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.search}>
          <span className={styles.apiName}>rickandmortyapi.com</span>
          <input
            id="search"
            type="text"
            placeholder={INPUT_PLACEHOLDER}
            value={props.inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              props.onInputChange(e.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
          <button className={styles.btnSearch} onClick={props.fetchSearchData}>
            Search
          </button>
        </div>
      </header>
    </>
  );
}
