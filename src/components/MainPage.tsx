import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import Header from './Header';
import Loader from './Loader';
import CharacterDetails from './CharacterDetails';
import { IDetailsCharacter } from '../types/interfaces';
import styles from '../styles/MainPage.module.css';
import Content from './Content';

interface IProps {
  characters: IDetailsCharacter[];
  detailsCharacter: IDetailsCharacter;
}

export default function MainPage({
  characters,
  detailsCharacter,
}: IProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(false);
  }, [characters, detailsCharacter]);

  const fetchHeader = (): void => {
    if (inputValue !== '') {
      searchClick(inputValue);
    }
  };

  const handleInputChange = (inputValue: string): void => {
    setInputValue(inputValue);
  };

  const searchClick = (inputValue: string): void => {
    navigate(`/?name=${inputValue}`);
    setLoading(true);
  };

  const handleCardClick = async (id: number): Promise<void> => {
    searchParams.set('details', id.toString());
    navigate(`/?${searchParams.toString()}`, { replace: true });
    setLoading(true);
  };

  const handlePaginationClick = (): void => {
    setLoading(true);
  };

  const handleCloseDetails = (): void => {
    searchParams.delete('details');
    navigate(`/?${searchParams.toString()}`, { replace: true });
  };

  const handleClearInput = (): void => {
    navigate(`/?page=1`, { replace: true });
    setInputValue('');
    setLoading(true);
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
        {loading && <Loader />}
        <>
          <Content
            characters={characters}
            handleCardClick={handleCardClick}
            handlePaginationClick={handlePaginationClick}
          />
          <CharacterDetails
            detailsCharacter={detailsCharacter}
            onClose={handleCloseDetails}
          />
        </>
      </div>
    </>
  );
}
