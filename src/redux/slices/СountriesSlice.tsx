import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICountry {
  countries: string[];
}

const initialState: ICountry = {
  countries: [
    'Russia',
    'Romania',
    'Canada',
    'United States',
    'Germany',
    'France',
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
