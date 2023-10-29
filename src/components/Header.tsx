import React from 'react';
import styles from './Header.module.css';
import Main from './Main';

interface Props {}

interface State {
  inputValue: string;
  dataPokemon: Array<{
    namePokemon: string;
    typePokemon: string;
    urlImg: string;
    err: boolean;
  }>;
}

interface manyPokemons {
  results: [
    {
      name: string;
      url: string;
    },
  ];
}

interface DataPokemon {
  name: string;
  types: [
    {
      type: {
        name: string;
      };
    },
  ];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}

class Header extends React.Component<Props, State> {
  placeholder: string;

  constructor(props: Props) {
    super(props);
    (this.placeholder = 'Enter pokemon name'),
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
      });
    this.fetchFirstPageLoad = this.fetchFirstPageLoad.bind(this);
    setTimeout(this.fetchFirstPageLoad, 100);
    this.fetchSearch = this.fetchSearch.bind(this);
  }

  fetchFirstPageLoad() {
    const newArr: Array<{
      pokemonName: string;
      pokemonType: string;
      urlImg: string;
      err: boolean;
    }> = [];
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
      .then((response) => {
        return response.json();
      })
      .then((data: manyPokemons) => {
        data.results.forEach((e) => {
          fetch(e.url)
            .then((response) => {
              return response.json();
            })
            .then((data: DataPokemon) =>
              newArr.push({
                pokemonName: data.name,
                pokemonType: data.types[0].type.name,
                urlImg: data.sprites.other.dream_world.front_default,
                err: false,
              })
            );
        });
        const arrManyPokmon = () => {
          console.log(newArr);
          this.setState({
            dataPokemon: [
              {
                namePokemon: newArr[0].pokemonName,
                urlImg: newArr[0].urlImg,
                typePokemon: newArr[0].pokemonType,
                err: false,
              },
              {
                namePokemon: newArr[1].pokemonName,
                urlImg: newArr[1].urlImg,
                typePokemon: newArr[1].pokemonType,
                err: false,
              },
              {
                namePokemon: newArr[2].pokemonName,
                urlImg: newArr[2].urlImg,
                typePokemon: newArr[2].pokemonType,
                err: false,
              },
            ],
          });
        };
        setTimeout(arrManyPokmon, 300);
      })
      .catch(() => {});
  }

  fetchSearch() {
    this.placeholder = 'Enter pokemon name';
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.state.inputValue.toLowerCase()}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data: DataPokemon) => {
        this.setState({
          dataPokemon: [
            {
              namePokemon: data.name,
              urlImg: data.sprites.other.dream_world.front_default,
              typePokemon: data.types[0].type.name,
              err: false,
            },
          ],
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
        });
      });
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
        <Main dataArray={this.state.dataPokemon} />
      </>
    );
  }
}

export default Header;
