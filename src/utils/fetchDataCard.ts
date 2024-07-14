import { ICharacter } from '../types/interfaces';

export const fetchDataCard = async (
  setIsLoadingCharacterDetails: (loading: boolean) => void,
  url: string
): Promise<ICharacter | null> => {
  setIsLoadingCharacterDetails(true);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  } finally {
    setIsLoadingCharacterDetails(false);
  }
};
