import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Loader from './Loader';
import CharacterDetails from './CharacterDetails';
import { ICharacterCard, IDataFetch } from '../types/interfaces';
import styles from '../styles/MainPage.module.css';
import Content from './Content';
import {
  useGetCardsByNumPageOrNameQuery,
  useGetCardByIdQuery,
} from '../redux/slices/apiSlice';
import NotFoundPage from './NotFoundPage';
import { useSearchParams } from 'react-router-dom';

export default function MainPage(): JSX.Element {
  const [dataFetch, setDataFetch] = useState<IDataFetch>({ results: [] });
  const [getDataById, setGetDataById] = useState<ICharacterCard | null>(null);
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('inputValue') || ''
  );
  const characterDetailsRef = useRef<HTMLDivElement | null>(null);
  const [showPagination, setShowPagination] = useState(true);
  const [numPageOrName, setNumPageOrName] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const [notFoundPage, setNotFoundPage] = useState(false);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details');

  const {
    data: dataByNumPageOrName,
    isLoading: isLoadingByNumPageOrName,
    isFetching: isFetchingByNumPageOrName,
    error: errorByNumPageOrName,
  } = useGetCardsByNumPageOrNameQuery(`?page=${page}`, {
    skip: !page,
  });

  const {
    data: dataById,
    isLoading: isLoadingById,
    isFetching: isFetchingById,
  } = useGetCardByIdQuery(details, {
    skip: !details,
  });

  useEffect(() => {
    const getInputValueFromLS = localStorage.getItem('inputValue');

    if (params.numPagination) {
      const [key, value] = params.numPagination.split('=');

      if (key === 'search') {
        searchClick(value);
        localStorage.setItem('inputValue', value);
      } else if (key === 'page') {
        /* paginationClick(Number(value)); */
      } else {
        setNotFoundPage(true);
      }
    }

    if (getInputValueFromLS) {
      searchClick(getInputValueFromLS);
    }
  }, [numPageOrName]);

  useEffect(() => {
    if (dataByNumPageOrName) {
      setDataFetch(dataByNumPageOrName);
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

  const handleCardClick = async (id: number): Promise<void> => {
    searchParams.set('details', id.toString());
    navigate(`/?${searchParams.toString()}`, { replace: true });
  };

  const handleCloseDetails = (): void => {
    searchParams.delete('details');
    navigate(`/?${searchParams.toString()}`, { replace: true });
    setGetDataById(null);
  };

  const handleClearInput = (): void => {
    setInputValue('');
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
      <div className={styles.mainContent} data-testid="mainContent">
        {isLoadingByNumPageOrName || isFetchingByNumPageOrName ? (
          <Loader />
        ) : notFoundPage ? (
          <NotFoundPage />
        ) : (
          <Content
            showPagination={showPagination}
            dataFetch={dataFetch}
            handleCardClick={handleCardClick}
            error={errorByNumPageOrName}
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
                detailsCharacter={getDataById}
                onClose={handleCloseDetails}
              />
            </div>
          )
        )}
      </div>
    </>
  );
}
