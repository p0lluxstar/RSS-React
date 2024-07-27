import MainPage from './components/MainPage';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/page=1" />}></Route>
          <Route path="/:numPagination" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
