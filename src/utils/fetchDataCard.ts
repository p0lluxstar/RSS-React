import { ICharacter } from '../types/interfaces';

export const fetchDataCard = async (
  url: string
): Promise<ICharacter | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};
