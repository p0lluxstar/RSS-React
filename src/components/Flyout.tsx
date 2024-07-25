import styles from '../styles/Flyout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreReducer } from '../types/interfaces';
import { createCsv } from '../utils/createCsv';
import { unselectAllCards } from '../redux/slices/selectedCardsSlice';

export default function Flyout(): JSX.Element | null {
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: IStoreReducer) => state.selectedCardsSlice.selectedCards
  );

  if (selectedCards.length === 0) {
    return null;
  }

  const handlUnselectAll = (): void => {
    dispatch(unselectAllCards());
  };

  return (
    <div className={styles.flyout} data-testid="flyout">
      <p>{selectedCards.length} items selected</p>
      <button onClick={handlUnselectAll}>Unselect all</button>
      <a
        href={createCsv(selectedCards)}
        download={`${selectedCards.length}_cards.csv`}
      >
        Download
      </a>
    </div>
  );
}
