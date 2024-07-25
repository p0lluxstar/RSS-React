import styles from '../styles/Flyout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreReducer } from '../types/interfaces';
import { unselectAllCards } from '../redux/slices/selectedCardsSlice';
import { createCSV } from '../utils/createCSV';

export default function Flyout(): JSX.Element | null {
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: IStoreReducer) => state.selectedCardsSlice.selectedCards
  );

  if (selectedIds.length === 0) {
    return null;
  }

  const handlUnselectAll = (): void => {
    dispatch(unselectAllCards());
  };

  return (
    <div className={styles.flyout}>
      <p>{selectedIds.length} items selected</p>
      <button onClick={handlUnselectAll}>Unselect all</button>
      <a
        href={createCSV(selectedIds)}
        download={`${selectedIds.length}_cards.csv`}
      >
        Download
      </a>
    </div>
  );
}
