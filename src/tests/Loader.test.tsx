import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '../components/loader';

describe('component Loader', () => {
  it('Test - the component Loader is displayed in the DOM', () => {
    render(<Loader />);

    expect(screen.getAllByTestId('loader'));
  });
});
