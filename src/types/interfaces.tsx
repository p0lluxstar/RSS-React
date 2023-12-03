export interface Props {}

export interface State extends DataPokemon {
  inputValue: string;
  isLoading: boolean;
}

export interface DataPokemon {
  dataPokemon: Array<object>;
}

export interface ArrWithDataUrlPokemons {
  dataPokemon: Array<{
    namePokemon: string;
    typePokemon: string;
    urlImg: string;
    err: boolean;
  }>;
}

export interface GetManyPokemons {
  results: [
    {
      name: string;
      url: string;
    },
  ];
}

export interface GetOnePokemon {
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

export interface StoreReducer {
  searchValue: {
    value: string;
  };
  quantityPokemoOnPage: {
    value: number;
  };
  loading: boolean;
  numPaginationPage: {
    value: string;
  };
}
