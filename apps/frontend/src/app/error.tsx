'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section>
      <h1>Não foi possível carregar a página</h1>
      <button type="button" onClick={reset}>
        Tentar novamente
      </button>
    </section>
  );
}
