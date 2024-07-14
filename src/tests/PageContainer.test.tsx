import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { fetchData } from '../utils/fetchData';
import { ICharacter, IDataFetch } from '../types/interfaces';

// Моки для fetchData и fetchDataCard
vi.mock('../utils/fetchData', () => ({
  fetchData: vi.fn(),
}));

describe('Компонент PageContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('должен отображать CharacterDetails при клике на карточку персонажа', async () => {
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

    (fetchData as jest.Mock).mockResolvedValueOnce(mockDataFetch);
    (fetchData as jest.Mock).mockResolvedValueOnce(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/page=1']}>
        <Routes>
          <Route path="/:numPagination" element={<PageContainer />} />
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

  it('должен отображать результаты поиска при выполнении поиска', async () => {
    const mockDataFetch: IDataFetch = {
      results: [
        { id: 1, name: 'Rick', image: 'url1' },
        { id: 2, name: 'Morty', image: 'url2' },
      ],
    };

    (fetchData as jest.Mock).mockResolvedValue(mockDataFetch);

    render(
      <MemoryRouter initialEntries={['/page=1']}>
        <Routes>
          <Route path="/:numPagination" element={<PageContainer />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText('Enter name card. Example: Rick'),
      {
        target: { value: 'Rick' },
      }
    );
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Rick')).toBeInTheDocument();
    });
  });

  it('должен отображать компонент NotFoundPage при отсутствии результатов', async () => {
    (fetchData as jest.Mock).mockResolvedValue({
      results: [{ id: 0, name: '', image: '' }],
    });

    render(
      <MemoryRouter initialEntries={['/search=unknown']}>
        <Routes>
          <Route path="/:numPagination" element={<PageContainer />} />
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
