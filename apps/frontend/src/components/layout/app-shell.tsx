import { Breadcrumb, Header, Sidebar } from '@valenet/ui';

import { ThemeToggle } from './theme-toggle';

import type { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar>
        <nav aria-label="Navegação principal">
          <span className="brand">Valenet Quality Hub</span>
        </nav>
      </Sidebar>
      <div className="content-column">
        <Header>
          <Breadcrumb items={['Início']} />
          <ThemeToggle />
        </Header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
