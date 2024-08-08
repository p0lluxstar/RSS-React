import MainPage from './components/MainPage';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
