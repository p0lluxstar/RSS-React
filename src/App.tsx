import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/1" />}></Route>
            <Route path="/:numPage" element={<Header />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
