import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main';
import NotFoundPage from './components/NotFoundPage';
import SearchValueContext from './contexts/SearchValueContext';

const App = () => {
  let searchValue = '';
  const searchValueLocalStorage = localStorage.getItem('searchValue');

  if (searchValueLocalStorage) {
    searchValue = searchValueLocalStorage;
  }

  return (
    <BrowserRouter>
      <>
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
      </>
    </BrowserRouter>
  );
};
export default App;
