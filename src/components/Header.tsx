import React from 'react';
import styles from './Header.module.css';
import Main from './Main';

interface Props {}

interface State {
  inputValue: string;
  namePokemon: string;
}

interface DataPokemon {
  name: string;
}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
      namePokemon: '',
    };
    this.fetchSearch = this.fetchSearch.bind(this);
  }

  fetchSearch() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.inputValue}`)
      .then((response) => {
        return response.json();
      })
      .then((data: DataPokemon) => {
        console.log(data);
        this.setState({ namePokemon: data.name });
      })
      .catch(() => {
        this.setState({ namePokemon: 'There is no Pokemon with such a name.' });
      });
  }

  render() {
    return (
      <>
        <header className={styles.header}>
          <input
            id="search"
            type="text"
            placeholder="Enter pokemon name"
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          ></input>
          <button onClick={this.fetchSearch}>Search</button>
        </header>
        <Main namePokemon={this.state.namePokemon} />
      </>
    );
  }
}

export default Header;
