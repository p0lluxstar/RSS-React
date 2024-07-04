import { IDataFetch } from '../../types/interfaces';

export const fetchSearch = async (
  setLoading: (loading: boolean) => void,
  setError: (error: boolean) => void,
  setData: (data: IDataFetch[]) => void,
  url: string
) => {
  setLoading(true);
  setError(false);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setData(data.results);
  } catch (error) {
    console.error('Fetch error:', error);
    setError(true);
  } finally {
    setLoading(false);
  }
};
