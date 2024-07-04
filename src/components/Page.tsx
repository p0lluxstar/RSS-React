import React from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './loader';
import Error from './Error';
import { fetchSearch } from '../assets/utils/fetchSearch';
import { generateRandomNum } from '../assets/utils/generateRandomNum';
import { IDataFetch } from '../types/interfaces';

interface State {
  dataFetch: IDataFetch[];
  isLoading: boolean;
  isError: boolean;
  inputValue: string;
}

class Page extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      dataFetch: [],
      isLoading: false,
      isError: false,
      inputValue: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    if (this.state.inputValue === '') {
      const numPage = generateRandomNum(1, 41);
      fetchSearch(
        this.setLoading,
        this.setError,
        this.setData,
        `https://rickandmortyapi.com/api/character/?page=${numPage}`
      );
    } else {
      fetchSearch(
        this.setLoading,
        this.setError,
        this.setData,
        `https://rickandmortyapi.com/api/character/?name=${this.state.inputValue}`
      );
    }
  };

  setLoading = (loading: boolean) => {
    this.setState({ isLoading: loading });
  };

  setData = (data: IDataFetch[]) => {
    this.setState({ dataFetch: data });
  };

  setError = (error: boolean) => {
    this.setState({ isError: error });
  };

  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue }); // обновляем состояние inputValue
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
        ) : this.state.isError ? (
          <Error />
        ) : (
          <Main dataFetch={this.state.dataFetch} />
        )}
      </>
    );
  }
}

export default Page;
