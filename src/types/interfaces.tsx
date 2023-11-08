export interface Props {}

export interface State extends DataPokemon {
  inputValue: string;
  isLoading: boolean;
}

export interface DataPokemon {
  dataPokemon: Array<object>;
}

export interface DataPokemonNewArr {
  dataPokemon: Array<{
    namePokemon: string;
    typePokemon: string;
    urlImg: string;
    err: boolean;
  }>;
}

export interface getManyPokemons {
  results: [
    {
      name: string;
      url: string;
    },
  ];
}

export interface getPokemon {
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
