import { IDataFetch } from '../types/interfaces';

export const fetchData = async (
  setIsLoading: (loading: boolean) => void,
  url: string
): Promise<IDataFetch | null> => {
  setIsLoading(true);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('404: Not Found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Fetch error:', error);

    if (error instanceof Error) {
      if (error.message.startsWith('404')) {
        return { results: [{ id: 0, name: '', image: '' }] };
      }
    }

    return null;
  } finally {
    setIsLoading(false);
  }
};
