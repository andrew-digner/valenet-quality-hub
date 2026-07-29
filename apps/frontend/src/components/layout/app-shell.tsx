import { Breadcrumb, Header, Sidebar } from '@valenet/ui';
import Link from 'next/link';

import { ThemeToggle } from './theme-toggle';

import type { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar>
        <nav aria-label="Navegação principal">
          <span className="brand">Valenet Quality Hub</span>
          <div className="nav-links">
            <Link href="/">Dashboard</Link>
            <Link href="/admin/usuarios">Usuários</Link>
            <Link href="/admin/papeis">Papéis</Link>
            <Link href="/admin/permissoes">Permissões</Link>
            <Link href="/admin/estrutura">Estrutura</Link>
          </div>
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
