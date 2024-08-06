import styles from '../styles/MainPage/MainPage.module.css';
import lightStyles from '../styles/MainPage/LightMainPage.module.css';
import darkStyles from '../styles/MainPage/DarkMainPage.module.css';
import Content from './Content';
import DetailsCharacter from './DetailsCharacter';
import { IDetailsCharacter } from '@/types/interfaces';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import Loader from './Loader';

interface IProps {
  characters: IDetailsCharacter[];
  handleCardClick: (id: number) => Promise<void>;
  showDetails: boolean;
  detailsCharacter: IDetailsCharacter;
  handleCloseDetails: () => void;
  loadingCards: boolean;
  loadingDetails: boolean;
}

const MainContent: React.FC<IProps> = ({
  characters,
  handleCardClick,
  showDetails,
  detailsCharacter,
  handleCloseDetails,
  loadingCards,
  loadingDetails,
}) => {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <div
      className={`${styles.mainContent} ${themeStyles.mainContent}`}
      data-testid="mainContent"
    >
      {loadingCards ? (
        <Loader />
      ) : (
        <Content characters={characters} handleCardClick={handleCardClick} />
      )}

      {showDetails &&
        (loadingDetails ? (
          <Loader />
        ) : (
          <DetailsCharacter
            detailsCharacter={detailsCharacter}
            onClose={handleCloseDetails}
          />
        ))}
    </div>
  );
};

export default MainContent;
