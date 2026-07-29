import { EditUser } from '../../../../../features/administration/components/edit-user';
export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="admin-page">
      <header className="page-heading">
        <div>
          <span className="eyebrow">Usuários</span>
          <h1>Editar usuário</h1>
        </div>
      </header>
      <EditUser id={id} />
    </section>
  );
}
