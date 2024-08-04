import React from 'react';
import styles from '../styles/MainPage/MainPage.module.css';
import lightStyles from '../styles/MainPage/LightMainPage.module.css';
import darkStyles from '../styles/MainPage/DarkMainPage.module.css';
import Content from './Content';
import DetailsCharacter from './DetailsCharacter';
import { IDetailsCharacter } from '@/types/interfaces';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

interface IProps {
  characters: IDetailsCharacter[];
  paginationClick: (pageNumber: number) => void;
  handleCardClick: (id: number) => Promise<void>;
  showDetails: boolean;
  detailsCharacter: IDetailsCharacter;
  handleCloseDetails: () => void;
}

const MainContent: React.FC<IProps> = ({
  characters,
  paginationClick,
  handleCardClick,
  showDetails,
  detailsCharacter,
  handleCloseDetails,
}) => {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <div
      className={`${styles.mainContent} ${themeStyles.mainContent}`}
      data-testid="mainContent"
    >
      <Content
        characters={characters}
        paginationClick={paginationClick}
        handleCardClick={handleCardClick}
      />
      {showDetails && (
        <DetailsCharacter
          detailsCharacter={detailsCharacter}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default MainContent;
