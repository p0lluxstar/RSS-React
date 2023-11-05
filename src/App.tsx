import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
