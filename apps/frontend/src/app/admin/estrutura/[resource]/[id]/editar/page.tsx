import { notFound } from 'next/navigation';

import { EditCatalog } from '../../../../../../features/administration/components/edit-catalog';

import type { OrganizationResource } from '../../../../../../features/administration/services/administration.service';

const resources = new Set(['companies', 'units', 'areas', 'teams', 'positions']);

export default async function EditOrganizationPage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource, id } = await params;
  if (!resources.has(resource)) notFound();
  return <EditCatalog id={id} kind={resource as OrganizationResource} />;
}
