import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FoundationPage from './page';

describe('FoundationPage', () => {
  it('identifies the product', () => {
    render(<FoundationPage />);

    expect(screen.getByRole('heading', { name: 'Dashboard administrativo' })).toBeInTheDocument();
  });
});
