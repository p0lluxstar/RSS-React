import { Component } from 'react';
import Page from './components/Page';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <Page />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
