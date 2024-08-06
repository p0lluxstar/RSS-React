import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NotFound from '@/app/not-found';

vi.mock('@/components/NotFoundPage', () => ({
  default: (): JSX.Element => (
    <div data-testid="not-found-page">Not Found Page</div>
  ),
}));

describe('NotFound', () => {
  it('должен корректно рендерить компонент NotFoundPage', () => {
    render(<NotFound />);

    // Проверяем, что компонент NotFoundPage отображается
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();

    // Можно также проверить текст внутри компонента
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });
});
