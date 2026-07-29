'use client';

import { useQuery } from '@tanstack/react-query';
import { EmptyState, Spinner } from '@valenet/ui';

import { administrationService } from '../services/administration.service';

import { CatalogForm } from './catalog-form';

import type { OrganizationResource } from '../services/administration.service';

export function EditCatalog({
  id,
  kind,
}: {
  id: string;
  kind: 'role' | 'permission' | OrganizationResource;
}) {
  const query = useQuery({
    queryKey: [kind, id],
    queryFn: () =>
      kind === 'role'
        ? administrationService.getRole(id)
        : kind === 'permission'
          ? administrationService.getPermission(id)
          : administrationService.getOrganization(kind, id),
  });
  if (query.isLoading) return <Spinner />;
  if (!query.data)
    return <EmptyState title="Registro não encontrado" description="Volte para a listagem." />;
  const item = query.data as unknown as Record<string, unknown>;
  return (
    <CatalogForm
      id={id}
      kind={kind}
      initialValues={{
        name: String(item.name ?? ''),
        code: String(item.code ?? ''),
        description: String(item.description ?? ''),
        hierarchy: Number(item.hierarchy ?? 0),
        permissionIdsText: Array.isArray(item.permissions)
          ? item.permissions
              .map((association) =>
                typeof association === 'object' &&
                association !== null &&
                'permissionId' in association
                  ? String(association.permissionId)
                  : '',
              )
              .filter(Boolean)
              .join(', ')
          : '',
        module: String(item.module ?? ''),
        resource: String(item.resource ?? ''),
        action: String(item.action ?? ''),
        companyId: String(item.companyId ?? ''),
        unitId: String(item.unitId ?? ''),
        areaId: String(item.areaId ?? ''),
        tradeName: String(item.tradeName ?? ''),
        document: String(item.document ?? ''),
        city: String(item.city ?? ''),
        state: String(item.state ?? ''),
      }}
    />
  );
}
