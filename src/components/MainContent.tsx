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
  handleCardClick: (id: number) => Promise<void>;
  detailsCharacter: IDetailsCharacter;
  handleCloseDetails: () => void;
  handlePaginationClick: () => void;
}

const MainContent: React.FC<IProps> = ({
  characters,
  handleCardClick,
  detailsCharacter,
  handleCloseDetails,
  handlePaginationClick,
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
        handleCardClick={handleCardClick}
        handlePaginationClick={handlePaginationClick}
      />
      <DetailsCharacter
        detailsCharacter={detailsCharacter}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default MainContent;
