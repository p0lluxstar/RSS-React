import styles from '../styles/characterDetails/CharacterDetails.module.css';
import lightStyles from '../styles/characterDetails/LightCharacterDetails.module.css';
import darkStyles from '../styles/characterDetails/DarkCharacterDetails.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { IDetailsCharacter } from '../types/interfaces';

interface IProps {
  detailsCharacter: IDetailsCharacter;
  onClose: () => void;
}

export default function DetailsCharacter({
  detailsCharacter,
  onClose,
}: IProps): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <div
      className={`${styles.characterDetails} ${themeStyles.characterDetails}`}
      data-testid="CharacterDetails"
    >
      <button onClick={onClose}>×</button>
      <h2>{detailsCharacter.name}</h2>
      <img src={detailsCharacter.image} alt={detailsCharacter.name} />
      <p>Status: {detailsCharacter.status}</p>
      <p>Species: {detailsCharacter.species}</p>
      <p>Gender: {detailsCharacter.gender}</p>
    </div>
  );
}

/* export const getServerSideProps = async (context: {
  query: { details?: string };
}): Promise<{
  props: {
    IDetailsCharacter: IDetailsCharacter | [];
  };
}> => {
  const { details = '1' } = context.query;
  let url = '';
  console.log('details');

  if (details) {
    url = `https://rickandmortyapi.com/api/character/1`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.results) {
      throw new Error('Invalid data structure');
    }

    return {
      props: {
        IDetailsCharacter: data.results,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        IDetailsCharacter: [],
      },
    };
  }
};
 */
