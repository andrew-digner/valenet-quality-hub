import { ThemeToggle } from './theme-toggle';

import type { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navegação principal">
        <span className="brand">Valenet Quality Hub</span>
      </aside>
      <div className="content-column">
        <header className="header">
          <span className="breadcrumb">Início</span>
          <ThemeToggle />
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
