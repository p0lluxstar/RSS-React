export interface IDataFetch {
  results: {
    id: number;
    image: string;
    name: string;
  }[];
}

export interface IDetailsCharacter {
  id?: number;
  name?: string;
  image?: string;
  status?: string;
  species?: string;
  gender?: string;
  error?: string;
}

export interface IStoreReducer {
  selectedCardsSlice: {
    selectedCards: IDetailsCharacter[];
  };
}
