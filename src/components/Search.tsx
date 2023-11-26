import { useState } from 'react';
import { searchValueActions } from '../redux/slices/SearchValueSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StoreReducer } from '../types/interfaces';

interface Current {
  clickOnSearch(): void;
}

export const Search = (props: Current) => {
  const searchValueStore = useSelector(
    (state: StoreReducer) => state.searchValue.value
  );
  const [inputValue, setInputValue] = useState(searchValueStore);

  const dispatchFunction = useDispatch();
  dispatchFunction(
    searchValueActions.setValueSearchLocalStorage(
      localStorage.getItem('searchValue')
    )
  );

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
