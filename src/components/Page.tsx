import { useEffect, useState, useRef } from 'react';
import Header from './Header';
import Pagination from './Pagination';
import Main from './Main';
import CharacterDetails from './CharacterDetails';
import { fetchData } from '../utils/fetchData';
import { ICharacter, IDataFetch } from '../types/interfaces';
import { fetchDataCard } from '../utils/fetchDataCard';
import styles from '../styles/Page.module.css';
import Loader from './Loader';

export default function Page(): JSX.Element {
  const [dataFetch, setDataFetch] = useState<IDataFetch>({ results: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('inputValue') || ''
  );
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  );

  const characterDetailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getInputValueFromLS = localStorage.getItem('inputValue');
    if (getInputValueFromLS === '' || getInputValueFromLS === null) {
      fetchPaginationData(1);
    } else {
      fetchSearchData(getInputValueFromLS);
    }
  }, []);

  const fetch = (): void => {
    if (inputValue !== '') {
      fetchSearchData(inputValue);
    } else {
      fetchPaginationData(1);
    }
    localStorage.setItem('inputValue', inputValue);
  };

  const handleInputChange = (inputValue: string): void => {
    setInputValue(inputValue);
  };

  const fetchSearchData = async (inputValue: string): Promise<void> => {
    const data = await fetchData(
      setIsLoading,
      `https://rickandmortyapi.com/api/character/?name=${inputValue}`
    );

    if (data) {
      setDataFetch(data);
    }
  };

  const fetchPaginationData = async (pageNumber: number): Promise<void> => {
    const data = await fetchData(
      setIsLoading,
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
    );

    if (data) {
      setDataFetch(data);
    }
  };

  const handleCardClick = async (id: number): Promise<void> => {
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    const data = await fetchDataCard(url);

    if (data) {
      console.log(data);
      setSelectedCharacter(data);
    }
  };

  const handleCloseDetails = (): void => {
    setSelectedCharacter(null);
  };

  return (
    <>
      <Header
        fetchSearchData={fetch}
        onInputChange={handleInputChange}
        inputValue={inputValue}
      />
      <Pagination onPageChange={fetchPaginationData} />
      <div className={styles.pageContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <Main dataFetch={dataFetch} onCardClick={handleCardClick} />
        )}
        {selectedCharacter && (
          <div ref={characterDetailsRef}>
            <CharacterDetails
              character={selectedCharacter}
              onClose={handleCloseDetails}
            />
          </div>
        )}
      </div>
    </>
  );
}

/* const [throwError, setThrowError] = useState(false); */
/* const errorBoundary = (): void => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('This is a test error');
  } */

/* <button className={styles.btnError} onClick={errorBoundary}>
        Error Boundary
      </button> */
