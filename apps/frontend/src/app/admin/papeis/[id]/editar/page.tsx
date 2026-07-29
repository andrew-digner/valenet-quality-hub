import { EditCatalog } from '../../../../../features/administration/components/edit-catalog';
export default async function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditCatalog id={id} kind="role" />;
}
