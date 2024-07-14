import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Loader from './loader';
import CharacterDetails from './CharacterDetails';
import { fetchData } from '../utils/fetchData';
import { ICharacter, IDataFetch } from '../types/interfaces';
import { fetchDataCard } from '../utils/fetchDataCard';
import styles from '../styles/PageContainer.module.css';
import NotFoundPage from './NotFoundPage';
import Content from './Content';

export default function PageContainer(): JSX.Element {
  const [dataFetch, setDataFetch] = useState<IDataFetch>({ results: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCharacterDetails, setIsLoadingCharacterDetails] =
    useState(false);
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('inputValue') || ''
  );
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  );
  const params = useParams();
  const numPageFromUrl = Number(params.numPagination);
  const characterDetailsRef = useRef<HTMLDivElement | null>(null);
  const [showPagination, setShowPagination] = useState(true);
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getInputValueFromLS = localStorage.getItem('inputValue');

    if (params.numPagination) {
      const [key, value] = params.numPagination.split('=');

      if (key === 'search') {
        fetchSearchData(value);
        localStorage.setItem('inputValue', value);
      }

      if (key === 'page') {
        fetchPaginationData(Number(value));
      } else {
        setNotFound(true);
      }
    }

    if (getInputValueFromLS) {
      fetchSearchData(getInputValueFromLS);
    }
  }, [numPageFromUrl]);

  const fetchHeader = (): void => {
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

    setNotFound(false);
    setShowPagination(false);
    navigate(`/search=${inputValue}`);
  };

  const fetchPaginationData = async (pageNumber: number): Promise<void> => {
    if (pageNumber <= 42) {
      const data = await fetchData(
        setIsLoading,
        `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
      );

      if (data) {
        setDataFetch(data);
      }

      setShowPagination(true);
      setNotFound(false);
    } else {
      setShowPagination(false);
      setNotFound(true);
    }
    navigate(`/page=${pageNumber}`);
  };

  const handleCardClick = async (id: number): Promise<void> => {
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    const data = await fetchDataCard(setIsLoadingCharacterDetails, url);

    if (data) {
      setSelectedCharacter(data);
    }
  };

  const handleCloseDetails = (): void => {
    setSelectedCharacter(null);
  };

  const handleClearInput = (): void => {
    setInputValue('');
    fetchPaginationData(1);
    localStorage.setItem('inputValue', '');
  };

  return (
    <>
      <Header
        fetchSearchData={fetchHeader}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        onClearInput={handleClearInput}
      />

      <div className={styles.pageContainer}>
        {isLoading ? (
          <Loader />
        ) : notFound ? (
          <NotFoundPage />
        ) : (
          <Content
            showPagination={showPagination}
            dataFetch={dataFetch}
            fetchPaginationData={fetchPaginationData}
            handleCardClick={handleCardClick}
          />
        )}
        {isLoadingCharacterDetails ? (
          <Loader />
        ) : (
          selectedCharacter && (
            <div
              className={styles.characterDetailsBox}
              ref={characterDetailsRef}
            >
              <CharacterDetails
                character={selectedCharacter}
                onClose={handleCloseDetails}
              />
            </div>
          )
        )}
      </div>
    </>
  );
}
