import { Badge, MetricCard } from '@valenet/ui';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <section className="admin-page">
      <header className="page-heading">
        <div>
          <Badge>Visão geral</Badge>
          <h1>Dashboard administrativo</h1>
          <p>Gestão segura de identidades e estrutura organizacional.</p>
        </div>
      </header>
      <div className="metrics-grid">
        <MetricCard label="Usuários" value="Gestão completa" />
        <MetricCard label="RBAC" value="Papéis e permissões" />
        <MetricCard label="Auditoria" value="Rastreabilidade ativa" />
      </div>
      <div className="quick-links">
        <Link href="/admin/usuarios">Gerenciar usuários</Link>
        <Link href="/admin/papeis">Gerenciar papéis</Link>
        <Link href="/admin/permissoes">Gerenciar permissões</Link>
      </div>
    </section>
  );
}
