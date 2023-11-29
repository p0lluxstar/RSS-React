import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Header';
import NotFoundPage from './components/NotFoundPage';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/1" />}></Route>
            <Route path="/index.html" element={<Navigate to="/1" />}></Route>
            <Route path="/:numPagination" element={<MainLayout />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Provider>
      </>
    </BrowserRouter>
  );
};
export default App;
