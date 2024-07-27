import { Component, ReactNode } from 'react';
import styles from '../styles/ErrorBoundary.module.css';

interface IState {
  hasError: boolean;
}

interface IProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ hasError: true });
    localStorage.setItem('inputValue', '');
    console.error('ErrorBoundary caught an error', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <p>Something went wrong...</p>
          <a href="/">Reset</a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
