import React from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './loader';
import { fetchSearch } from '../assets/utils/fetchSearch';
import { generateRandomNum } from '../assets/utils/generateRandomNum';
import { IDataFetch } from '../types/interfaces';
import styles from './Page.module.css';
import ErrorBoundary from './ErrorBoundary';

interface State {
  dataFetch: IDataFetch[];
  isLoading: boolean;
  inputValue: string;
}

class Page extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      dataFetch: [],
      isLoading: false,
      inputValue: localStorage.getItem('inputValue') || '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    if (this.state.inputValue === '') {
      const numPage = generateRandomNum(1, 41);
      const data = await fetchSearch(
        this.setLoading,
        `https://rickandmortyapi.com/api/character/?page=${numPage}`
      );
      this.setData(data.results);
    } else {
      const data = await fetchSearch(
        this.setLoading,
        `https://rickandmortyapi.com/api/character/?name=${this.state.inputValue}`
      );

      this.setData(data.results);
    }
    localStorage.setItem('inputValue', this.state.inputValue);
  };

  error = async () => {
    const data = await fetchSearch(
      this.setLoading,
      `https://rickandmortyapi1.com`
    );

    this.setData(data.results);
  };

  setLoading = (loading: boolean) => {
    this.setState({ isLoading: loading });
  };

  setData = (data: IDataFetch[]) => {
    this.setState({ dataFetch: data });
  };

  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <>
        <Header
          fetchSearch={this.fetchData}
          onInputChange={this.handleInputChange}
          inputValue={this.state.inputValue}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <ErrorBoundary>
            <Main dataFetch={this.state.dataFetch} />
          </ErrorBoundary>
        )}
        <button className={styles.error} onClick={this.error}>
          Error
        </button>
      </>
    );
  }
}

export default Page;
