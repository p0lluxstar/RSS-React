import Page from './components/Page';
import ErrorBoundary from './components/ErrorBoundary';

export default function App(): JSX.Element {
  return (
    <>
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
    </>
  );
}
