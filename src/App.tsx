import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main';
import NotFoundPage from './components/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/1" />}></Route>
          <Route path="/:numPage" element={<Main />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};
export default App;
