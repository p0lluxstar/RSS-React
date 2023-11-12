import { createContext } from 'react';

const SearchValueContext = createContext({
  searchValue: '',
  setSearchValue: () => {},
});

export default SearchValueContext;
