import { IDataFetch } from '../types/interfaces';

export const fetchSearch = async (
  setIsLoading: (loading: boolean) => void,
  url: string
): Promise<IDataFetch> => {
  setIsLoading(true);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('404: Not Found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error('Fetch error:', error);

    if (error instanceof Error) {
      if (error.message.startsWith('404')) {
        return { results: [{ name: '', image: '' }] };
      }
    }

    return { results: [{ name: 'err', image: 'err' }] };
  } finally {
    setIsLoading(false);
  }
};
