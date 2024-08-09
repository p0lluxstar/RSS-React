import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
/* import Loader from './Loader'; */
import CharacterDetails from './CharacterDetails';
import { IDetailsCharacter } from '../types/interfaces';
import styles from '../styles/MainPage.module.css';
import Content from './Content';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  characters: IDetailsCharacter[];
  detailsCharacter: IDetailsCharacter;
}

export default function MainPage({
  characters,
  detailsCharacter,
}: IProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [showPagination, setShowPagination] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchHeader = (): void => {
    if (inputValue !== '') {
      searchClick(inputValue);
    }
  };

  const handleInputChange = (inputValue: string): void => {
    setInputValue(inputValue);
  };

  const searchClick = (inputValue: string): void => {
    setShowPagination(false);
    navigate(`/?name=${inputValue}`);
  };

  const handleCardClick = async (id: number): Promise<void> => {
    searchParams.set('details', id.toString());
    navigate(`/?${searchParams.toString()}`, { replace: true });
  };

  const handleCloseDetails = (): void => {
    searchParams.delete('details');
    navigate(`/?${searchParams.toString()}`, { replace: true });
  };

  const handleClearInput = (): void => {
    navigate(`/?page=1`, { replace: true });
    setShowPagination(true);
    setInputValue('');
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
        <Content
          showPagination={showPagination}
          characters={characters}
          handleCardClick={handleCardClick}
        />
        <CharacterDetails
          detailsCharacter={detailsCharacter}
          onClose={handleCloseDetails}
        />
      </div>
    </>
  );
}
