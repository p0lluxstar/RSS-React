import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICountry {
  countries: string[];
}

const initialState: ICountry = {
  countries: [
    'Belarus',
    'Canada',
    'China',
    'England',
    'France',
    'Germany',
    'Italy',
    'Japan',
    'Kazakhstan',
    'Romania',
    'Russia',
    'United States',
    'Ukraine',
  ],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    addCountry(state, action: PayloadAction<string>) {
      state.countries.push(action.payload);
    },
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
});

export const { addCountry, setCountries } = countrySlice.actions;
export default countrySlice.reducer;
