import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Loader from './loader';
import CharacterDetails from './CharacterDetails';
import { ICharacter, IDataFetch } from '../types/interfaces';
import styles from '../styles/PageContainer.module.css';
import NotFoundPage from './NotFoundPage';
import Content from './Content';
import { MAX_PAGE_NUMBER } from '../constants/components';
import {
  useGetCardsByNumPageOrNameQuery,
  useGetCardByIdQuery,
} from '../redux/slices/apiSlice';

export default function PageContainer(): JSX.Element {
  const [dataFetch, setDataFetch] = useState<IDataFetch>({ results: [] });
  const [getDataById, setGetDataById] = useState<ICharacter | null>(null);
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('inputValue') || ''
  );
  const characterDetailsRef = useRef<HTMLDivElement | null>(null);
  const [showPagination, setShowPagination] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [numPageOrName, setNumPageOrName] = useState('');
  const [cardId, setCardId] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: dataByNumPageOrName,
    isLoading: isLoadingByNumPageOrName,
    isFetching: isFetchingByNumPageOrName,
    isError: isErrorByNumPageOrName,
  } = useGetCardsByNumPageOrNameQuery(numPageOrName, {
    skip: !numPageOrName,
  });

  const {
    data: dataById,
    isLoading: isLoadingById,
    isFetching: isFetchingById,
  } = useGetCardByIdQuery(cardId, {
    skip: !cardId,
  });

  useEffect(() => {
    const getInputValueFromLS = localStorage.getItem('inputValue');

    if (params.numPagination) {
      const [key, value] = params.numPagination.split('=');

      if (key === 'search') {
        searchClick(value);
        localStorage.setItem('inputValue', value);
      } else if (key === 'page') {
        paginationClick(Number(value));
      } else {
        setNotFound(true);
      }
    }

    if (getInputValueFromLS) {
      searchClick(getInputValueFromLS);
    }
  }, [numPageOrName]);

  useEffect(() => {
    if (dataByNumPageOrName) {
      setDataFetch(dataByNumPageOrName);
      setNotFound(dataByNumPageOrName.results.length === 0);
    } else {
      setNotFound(true);
    }
  }, [dataByNumPageOrName]);

  useEffect(() => {
    if (dataById) {
      setGetDataById(dataById);
    }
  }, [dataById]);

  const fetchHeader = (): void => {
    if (inputValue !== '') {
      searchClick(inputValue);
    } else {
      paginationClick(1);
    }
    localStorage.setItem('inputValue', inputValue);
  };

  const handleInputChange = (inputValue: string): void => {
    setInputValue(inputValue);
  };

  const searchClick = (inputValue: string): void => {
    setNumPageOrName(`/?name=${inputValue}`);
    setShowPagination(false);
    navigate(`/search=${inputValue}`);
  };

  const paginationClick = (pageNumber: number): void => {
    if (pageNumber <= MAX_PAGE_NUMBER) {
      setNumPageOrName(`/?page=${pageNumber}`);
      setShowPagination(true);

      navigate(`/page=${pageNumber}`);
    } else {
      setShowPagination(false);
      setNotFound(true);
    }
  };

  const handleCardClick = async (id: number): Promise<void> => {
    setCardId(`/${id}`);

    if (dataById) {
      setGetDataById(dataById);
    }
  };

  const handleCloseDetails = (): void => {
    setGetDataById(null);
  };

  const handleClearInput = (): void => {
    setInputValue('');
    paginationClick(1);
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
        {isLoadingByNumPageOrName || isFetchingByNumPageOrName ? (
          <Loader />
        ) : notFound || isErrorByNumPageOrName ? (
          <NotFoundPage />
        ) : (
          <Content
            showPagination={showPagination}
            dataFetch={dataFetch}
            paginationClick={paginationClick}
            handleCardClick={handleCardClick}
          />
        )}
        {isLoadingById || isFetchingById ? (
          <Loader />
        ) : (
          getDataById && (
            <div
              className={styles.characterDetailsBox}
              ref={characterDetailsRef}
            >
              <CharacterDetails
                character={getDataById}
                onClose={handleCloseDetails}
              />
            </div>
          )
        )}
      </div>
    </>
  );
}
