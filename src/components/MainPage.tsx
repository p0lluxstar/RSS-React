import { useState } from 'react';
import Header from './Header';

export default function MainPage(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');

  const fetchHeader = (): void => {};

  const handleInputChange = (inputValue: string): void => {
    setInputValue(inputValue);
  };

  const handleClearInput = (): void => {};
  return (
    <>
      <Header
        fetchSearchData={fetchHeader}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        onClearInput={handleClearInput}
      />
    </>
  );
}
