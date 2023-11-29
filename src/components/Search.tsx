import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchValueActions } from '../redux/slices/SearchValueSlice';
import { StoreReducer } from '../types/interfaces';

interface Current {
  clickOnSearch(): void;
}

export const Search = (props: Current) => {
  const dispatchFunction = useDispatch();

  if (typeof window !== 'undefined') {
    dispatchFunction(
      searchValueActions.setValueSearchLocalStorage(
        localStorage.getItem('searchValue')
      )
    );
  }

  const searchValueStore = useSelector(
    (state: StoreReducer) => state.searchValue.value
  );

  const [inputValue, setInputValue] = useState(searchValueStore);

  function searchValue() {
    dispatchFunction(searchValueActions.setValueSearchLocalStorage(inputValue));
    props.clickOnSearch();
  }

  return (
    <>
      <input
        id="search"
        type="text"
        placeholder="Enter pokemon name. Example: Pikachu"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
      ></input>
      <button onClick={searchValue}>Search</button>
    </>
  );
};
