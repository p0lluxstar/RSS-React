import React from 'react';
import styles from './Header.module.css';
import Main from './Main';
import { Props, State, getManyPokemons, getPokemon } from '../types/interfaces';

class Header extends React.Component<Props, State> {
  placeholder: string;

  constructor(props: Props) {
    super(props);
    (this.placeholder = 'Enter pokemon name. Example: Pikachu'),
      (this.state = {
        inputValue: '',
        dataPokemon: [
          {
            namePokemon: '',
            typePokemon: '',
            urlImg: '',
            err: false,
          },
        ],
        isLoading: false,
      });
    this.fetchFirstPageLoad = this.fetchFirstPageLoad.bind(this);
    setTimeout(this.fetchFirstPageLoad, 100);
    this.fetchSearch = this.fetchSearch.bind(this);
  }

  fetchFirstPageLoad() {
    this.setState({
      inputValue: `${localStorage.getItem('lastSearch')}`,
    });
    if (localStorage.getItem('lastSearch')) {
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${localStorage.getItem(
          'lastSearch'
        )}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data: getPokemon) => {
          this.setState({
            dataPokemon: [
              {
                namePokemon: data.name,
                urlImg: data.sprites.other.dream_world.front_default,
                typePokemon: data.types[0].type.name,
                err: false,
              },
            ],
            isLoading: true,
          });
        })
        .catch(() => {
          this.setState({
            dataPokemon: [
              {
                namePokemon: '',
                typePokemon: '',
                urlImg: '',
                err: true,
              },
            ],
            isLoading: true,
          });
        });
    } else {
      const newArr: Array<{
        namePokemon: string;
        typePokemon: string;
        urlImg: string;
        err: boolean;
      }> = [];
      fetch(`https://pokeapi.co/api/v2/pokemon/`)
        .then((response) => {
          return response.json();
        })
        .then((data: getManyPokemons) => {
          data.results.forEach((e) => {
            fetch(e.url)
              .then((response) => {
                return response.json();
              })
              .then((data: getPokemon) =>
                newArr.push({
                  namePokemon: data.name,
                  typePokemon: data.types[0].type.name,
                  urlImg: data.sprites.other.dream_world.front_default,
                  err: false,
                })
              );
          });
          const arrManyPokemon = () => {
            this.setState({
              dataPokemon: newArr,
              isLoading: true,
            });
          };
          setTimeout(arrManyPokemon, 300);
        })
        .catch(() => {});
    }
  }

  fetchSearch() {
    this.setState({
      isLoading: false,
    });
    if (this.state.inputValue === '') {
      localStorage.setItem('lastSearch', '');
      this.fetchFirstPageLoad();
    } else {
      this.placeholder = 'Enter pokemon name. Example: Pikachu';
      localStorage.setItem('lastSearch', this.state.inputValue);
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.state.inputValue.toLowerCase()}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data: getPokemon) => {
          this.setState({
            dataPokemon: [
              {
                namePokemon: data.name,
                urlImg: data.sprites.other.dream_world.front_default,
                typePokemon: data.types[0].type.name,
                err: false,
              },
            ],
            isLoading: true,
          });
        })
        .catch(() => {
          this.setState({
            dataPokemon: [
              {
                namePokemon: '',
                typePokemon: '',
                urlImg: '',
                err: true,
              },
            ],
            isLoading: true,
          });
        });
    }
  }

  render() {
    return (
      <>
        <header className={styles.header}>
          <input
            id="search"
            type="text"
            placeholder={this.placeholder}
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          ></input>
          <button onClick={this.fetchSearch}>Search</button>
        </header>

        {!this.state.isLoading && <p className={styles.loading}>Loading...</p>}
        {this.state.isLoading && <Main dataPokemon={this.state.dataPokemon} />}
      </>
    );
  }
}

export default Header;
