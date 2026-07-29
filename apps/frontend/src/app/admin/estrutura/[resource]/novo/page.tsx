import { notFound } from 'next/navigation';

import { CatalogForm } from '../../../../../features/administration/components/catalog-form';

import type { OrganizationResource } from '../../../../../features/administration/services/administration.service';

const resources = new Set(['companies', 'units', 'areas', 'teams', 'positions']);

export default async function NewOrganizationPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  if (!resources.has(resource)) notFound();
  return <CatalogForm kind={resource as OrganizationResource} />;
}
