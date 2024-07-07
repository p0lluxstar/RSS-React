import React from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './loader';
import { fetchSearch } from '../utils/fetchSearch';
import { IDataFetch } from '../types/interfaces';
import styles from '../styles/Page.module.css';
import { generateRandomNum } from '../utils/generateRandomNum';

interface State {
  dataFetch: IDataFetch[];
  isLoading: boolean;
  inputValue: string;
  isInputEmpty: boolean;
}

class Page extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      dataFetch: [],
      isLoading: false,
      inputValue: localStorage.getItem('inputValue') || '',
      isInputEmpty: false,
    };
  }

  componentDidMount() {
    const getInputValueFromLS = localStorage.getItem('inputValue');
    getInputValueFromLS === '' ? this.fetchStart() : this.fetchData();
  }

  fetchStart = async () => {
    if (this.state.inputValue === '') {
      const numPage = generateRandomNum(1, 41);
      const data = await fetchSearch(
        this.setLoading,
        `https://rickandmortyapi.com/api/character/?page=${numPage}`
      );
      this.setInputError(false);
      this.setData(data.results);
    }
  };

  fetchData = async (isSetInputError?: boolean) => {
    console.log(isSetInputError);
    if (this.state.inputValue !== '') {
      const data = await fetchSearch(
        this.setLoading,
        `https://rickandmortyapi.com/api/character/?name=${this.state.inputValue}`
      );
      this.setInputError(false);
      this.setData(data.results);
    } else if (isSetInputError === undefined || isSetInputError) {
      this.setInputError(true); // при клике на searc при пустом input или нажатии на enter подсвечивается input
    }
    localStorage.setItem('inputValue', this.state.inputValue);
  };

  errorBoundary = async () => {
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

  setInputError = (loading: boolean) => {
    this.setState({ isInputEmpty: loading });
  };

  handleInputChange = (inputValue: string) => {
    if (inputValue.length === 0) {
      this.setInputError(true);
    }

    if (inputValue.length > 0) {
      this.setInputError(false);
    }

    this.setState({ inputValue });
  };

  render() {
    return (
      <>
        <Header
          fetchSearch={this.fetchData} // Передаем функцию fetchData в Header
          onInputChange={this.handleInputChange}
          inputValue={this.state.inputValue}
          isInputEmpty={this.state.isInputEmpty}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Main dataFetch={this.state.dataFetch} />
        )}
        <button className={styles.btnError} onClick={this.errorBoundary}>
          Error Boundary
        </button>
      </>
    );
  }
}

export default Page;
