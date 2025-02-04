export interface IDataUserOnPage {
  index?: number;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female';
  country: string;
  file: string;
}

export interface IDataForm extends IDataUserOnPage {
  confirmPassword: string;
  agreement: boolean;
}

export interface IStoreReducer {
  countries: string[];
}
