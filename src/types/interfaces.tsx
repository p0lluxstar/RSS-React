export interface IDataForm {
  index?: number;
  name: string;
  age: string;
  gender: string;
  email: string;
  country: string;
  password: string;
  confirmPassword?: string;
  file: string;
  agreement?: boolean;
}

export interface IStoreReducer {
  countries: string[];
}
