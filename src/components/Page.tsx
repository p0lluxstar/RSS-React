import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './loader';
import { fetchSearch } from '../utils/fetchSearch';
import styles from '../styles/Page.module.css';
import { generateRandomNum } from '../utils/generateRandomNum';
import { IDataFetch } from '../types/interfaces';

export default function Page(): JSX.Element {
  const [dataFetch, setDataFetch] = useState<IDataFetch>({ results: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('inputValue') || ''
  );

  useEffect(() => {
    const getInputValueFromLS = localStorage.getItem('inputValue');
    getInputValueFromLS === '' || getInputValueFromLS === null
      ? fetchStart()
      : fetchSearchData();
  }, []);

  const fetchStart = async (): Promise<void> => {
    const numPage = generateRandomNum(1, 41);
    const data = await fetchSearch(
      setIsLoading,
      `https://rickandmortyapi.com/api/character/?page=${numPage}`
    );
    setIsInputEmpty(false);
    setDataFetch(data);
  };

  const fetchSearchData = async (isSetInputError?: boolean): Promise<void> => {
    console.log(isSetInputError);
    if (inputValue !== '') {
      const data = await fetchSearch(
        setIsLoading,
        `https://rickandmortyapi.com/api/character/?name=${inputValue}`
      );
      setIsInputEmpty(false);
      setDataFetch(data);
    } else if (isSetInputError === undefined || isSetInputError) {
      setIsInputEmpty(true); // при клике на searc при пустом input или нажатии на enter подсвечивается input
    }
    localStorage.setItem('inputValue', inputValue);
  };

  const errorBoundary = async (): Promise<void> => {
    const data = await fetchSearch(
      setIsLoading,
      `https://rickandmortyapi1.com`
    );
    setDataFetch(data);
  };

  const handleInputChange = (inputValue: string): void => {
    if (inputValue.length === 0) {
      setIsInputEmpty(true);
    }

    if (inputValue.length > 0) {
      setIsInputEmpty(false);
    }

    setInputValue(inputValue);
  };

  return (
    <>
      <Header
        fetchSearchData={fetchSearchData} // Передаем функцию fetchSearchData в Header
        onInputChange={handleInputChange}
        inputValue={inputValue}
        isInputEmpty={isInputEmpty}
      />
      {isLoading ? <Loader /> : <Main dataFetch={dataFetch} />}
      <button className={styles.btnError} onClick={errorBoundary}>
        Error Boundary
      </button>
    </>
  );
}
