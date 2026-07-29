import Link from 'next/link';

const resources = [
  ['companies', 'Empresas'],
  ['units', 'Unidades'],
  ['areas', 'Áreas'],
  ['teams', 'Equipes'],
  ['positions', 'Cargos'],
];

export default function OrganizationPage() {
  return (
    <section className="admin-page">
      <header className="page-heading">
        <div>
          <span className="eyebrow">Administração</span>
          <h1>Estrutura organizacional</h1>
          <p>Empresa → Unidade → Área → Equipe → Usuário</p>
        </div>
      </header>
      <div className="quick-links">
        {resources.map(([resource, label]) => (
          <Link key={resource} href={`/admin/estrutura/${resource}`}>
            Gerenciar {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
