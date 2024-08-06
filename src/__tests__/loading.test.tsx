import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from '@/app/loading';

describe('Компонент Loader', () => {
  it('Loader компонентов отображается в DOM', () => {
    render(<Loading />);

    expect(screen.getAllByTestId('loader'));
  });
});
