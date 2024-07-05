export const fetchSearch = async (
  setLoading: (loading: boolean) => void,
  url: string
) => {
  setLoading(true);

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
        return { results: [] };
      }
    }

    return {};
  } finally {
    setLoading(false);
  }
};
