import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Button, EmptyState, Progress } from './primitives';

describe('Design System primitives', () => {
  it('renders a typed button and its accessible label', () => {
    const markup = renderToStaticMarkup(<Button aria-label="Salvar">Salvar</Button>);

    expect(markup).toContain('aria-label="Salvar"');
    expect(markup).toContain('ui-button-primary');
  });

  it('renders standardized empty and progress states', () => {
    const markup = renderToStaticMarkup(
      <>
        <EmptyState description="Não há registros." title="Lista vazia" />
        <Progress value={40} />
      </>,
    );

    expect(markup).toContain('Lista vazia');
    expect(markup).toContain('aria-valuenow="40"');
  });
});
