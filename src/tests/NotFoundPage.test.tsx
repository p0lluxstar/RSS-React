import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../components/NotFoundPage';

describe('Компонент NotFoundPage', () => {
  it('NotFoundPage компонентов отображается в DOM', () => {
    render(<NotFoundPage />);

    expect(screen.getAllByTestId('notFoundPage'));
  });
});
