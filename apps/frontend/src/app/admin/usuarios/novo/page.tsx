import { UserForm } from '../../../../features/administration/components/user-form';
export default function NewUserPage() {
  return (
    <section className="admin-page">
      <header className="page-heading">
        <div>
          <span className="eyebrow">Usuários</span>
          <h1>Novo usuário</h1>
        </div>
      </header>
      <UserForm />
    </section>
  );
}
