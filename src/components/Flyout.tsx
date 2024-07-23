import { useEffect } from 'react';
import styles from '../styles/Flyout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreReducer } from '../types/interfaces';
import { unselectAllCards } from '../redux/slices/selectedCardSlice';

export default function Flyout(): JSX.Element | null {
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: IStoreReducer) => state.selectedCards.selectedIds
  );
  console.log('selectedIds', selectedIds);

  useEffect(() => {
    console.log('eff');
  }, [selectedIds]);

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
      <button>Download</button>
    </div>
  );
}
