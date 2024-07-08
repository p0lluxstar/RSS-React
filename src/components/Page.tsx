import { useEffect, useState } from 'react';
import Header from './Header';
import Pagination from './Pagination';
import Main from './Main';
import Loader from './loader';
import CharacterDetails from './CharacterDetails';
import { fetchData } from '../utils/fetchData';
import { IDataFetch } from '../types/interfaces';
import { fetchDataCard } from '../utils/fetchDataCard';

export default function Page(): JSX.Element {
  const [dataFetch, setDataFetch] = useState<IDataFetch>({ results: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('inputValue') || ''
  );
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  );

  useEffect(() => {
    const getInputValueFromLS = localStorage.getItem('inputValue');
    getInputValueFromLS === '' || getInputValueFromLS === null
      ? fetchPaginationData(1)
      : fetchSearchData(getInputValueFromLS);
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

  return (
    <>
      <Header
        fetchSearchData={fetch} // Передаем функцию fetchSearchData в Header
        onInputChange={handleInputChange}
        inputValue={inputValue}
      />
      <Pagination onPageChange={fetchPaginationData} />
      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
      {isLoading ? (
        <Loader />
      ) : (
        <Main dataFetch={dataFetch} onCardClick={handleCardClick} />
      )}
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
