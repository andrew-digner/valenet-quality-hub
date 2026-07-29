'use client';

import { useQuery } from '@tanstack/react-query';
import { EmptyState, Spinner } from '@valenet/ui';

import { administrationService } from '../services/administration.service';

import { UserForm } from './user-form';

export function EditUser({ id }: { id: string }) {
  const query = useQuery({
    queryKey: ['users', id],
    queryFn: () => administrationService.getUser(id),
  });
  if (query.isLoading) return <Spinner />;
  if (!query.data)
    return <EmptyState title="Usuário não encontrado" description="Volte para a listagem." />;
  const user = query.data as unknown as {
    name: string;
    registration: string;
    email: string;
    phone?: string;
    companyId: string;
    areaId: string;
    teamId: string;
    roles: Array<{ role: { id: string } }>;
  };
  return (
    <UserForm
      id={id}
      initialValues={{
        name: user.name,
        registration: user.registration,
        email: user.email,
        phone: user.phone ?? '',
        companyId: user.companyId,
        areaId: user.areaId,
        teamId: user.teamId,
        roleIds: user.roles.map(({ role }) => role.id),
      }}
    />
  );
}
