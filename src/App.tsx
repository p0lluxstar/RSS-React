import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main';
import NotFoundPage from './components/NotFoundPage';
import SearchValueContext from './contexts/SearchValueContext';
import QuantityPokemoOnPageContext from './contexts/QuantityPokemoOnPageContext';

const App = () => {
  let searchValue = '';
  const searchValueLocalStorage = localStorage.getItem('searchValue');

  if (searchValueLocalStorage) {
    searchValue = searchValueLocalStorage;
  }

  return (
    <BrowserRouter>
      <>
        <QuantityPokemoOnPageContext.Provider value={20}>
          <SearchValueContext.Provider
            value={{
              searchValue: searchValue,
              setSearchValue: () => {},
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/1" />}></Route>
              <Route path="/index.html" element={<Navigate to="/1" />}></Route>
              <Route path="/:numPagination" element={<Main />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </SearchValueContext.Provider>
        </QuantityPokemoOnPageContext.Provider>
      </>
    </BrowserRouter>
  );
};
export default App;
