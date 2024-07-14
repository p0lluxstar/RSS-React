import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '../components/PageContainer';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fetchData, fetchDataCard } from '../utils/fetchData';
import { ICharacter, IDataFetch } from '../types/interfaces';

// Моки для fetchData и fetchDataCard
vi.mock('../utils/fetchData', () => ({
  fetchData: vi.fn(),
  fetchDataCard: vi.fn(),
}));

describe('Page component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render CharacterDetails when a character card is clicked', async () => {
    const mockDataFetch: IDataFetch = {
      results: [
        { id: 1, name: 'Rick', image: 'url1' },
        { id: 2, name: 'Morty', image: 'url2' },
      ],
    };

    const mockCharacter: ICharacter = {
      name: 'Rick',
      image: 'url1',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
    };

    (fetchData as vi.Mock).mockResolvedValue(mockDataFetch);
    (fetchDataCard as vi.Mock).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/page=1']}>
        <Routes>
          <Route path="/:numPagination" element={<Page />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Rick'));

    await waitFor(() => {
      expect(screen.getByTestId('CharacterDetails')).toBeInTheDocument();
    });
  });

  it('should render search results when a search is performed', async () => {
    const mockDataFetch: IDataFetch = {
      results: [
        { id: 1, name: 'Rick', image: 'url1' },
        { id: 2, name: 'Morty', image: 'url2' },
      ],
    };

    (fetchData as vi.Mock).mockResolvedValue(mockDataFetch);

    render(
      <MemoryRouter initialEntries={['/page=1']}>
        <Routes>
          <Route path="/:numPagination" element={<Page />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText('Enter name card. Example: Rick'),
      { target: { value: 'Rick' } }
    );
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Rick')).toBeInTheDocument();
    });
  });

  it('should render NotFoundPage component when no results found', async () => {
    (fetchData as vi.Mock).mockResolvedValue({
      results: [{ id: 0, name: '', image: '' }],
    });

    render(
      <MemoryRouter initialEntries={['/search=unknown']}>
        <Routes>
          <Route path="/:numPagination" element={<Page />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('There is no card with that name.')
      ).toBeInTheDocument();
    });
  });
});
