export interface IDataFetch {
  results: {
    id: number;
    image: string;
    name: string;
  }[];
}

export interface ICharacter {
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
}

export interface IStoreReducer {
  selectedCards: {
    selectedIds: number[];
  };
}
