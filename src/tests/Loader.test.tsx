import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '../components/LoaderTemp';

describe('Компонент Loader', () => {
  it('Loader компонентов отображается в DOM', () => {
    render(<Loader />);

    expect(screen.getAllByTestId('loader'));
  });
});
