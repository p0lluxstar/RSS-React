import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import UncontrolledFormPage from './pages/UncontrolledFormPage';
import ReactHookFormPage from './pages/ReactHookFormPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="uncontrolled-form" element={<UncontrolledFormPage />} />
          <Route path="react-hook-form" element={<ReactHookFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
