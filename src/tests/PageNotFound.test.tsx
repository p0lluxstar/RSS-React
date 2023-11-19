import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from '../components/Main';
import { MemoryRouter } from 'react-router-dom';

test('Test - PageNotFound', () => {
  render(
    <MemoryRouter initialEntries={['/anyadress']}>
      <Main />
    </MemoryRouter>
  );
  expect(screen.getByText('Error 404. Page Not Found')).toBeInTheDocument();
});
