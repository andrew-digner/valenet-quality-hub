import { notFound } from 'next/navigation';

import { OrganizationList } from '../../../../features/administration/components/organization-list';

import type { OrganizationResource } from '../../../../features/administration/services/administration.service';

const resources = new Set(['companies', 'units', 'areas', 'teams', 'positions']);

export default async function OrganizationResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  if (!resources.has(resource)) notFound();
  return <OrganizationList resource={resource as OrganizationResource} />;
}
