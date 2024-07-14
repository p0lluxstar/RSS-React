import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../components/NotFoundPage';

describe('component Loader', () => {
  it('Test - the component Loader is displayed in the DOM', () => {
    render(<NotFoundPage />);

    expect(screen.getAllByTestId('notFoundPage'));
  });
});
