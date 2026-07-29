'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, DataTable, EmptyState, Pagination, SearchInput, Spinner } from '@valenet/ui';
import Link from 'next/link';
import { useState } from 'react';

import { administrationService } from '../services/administration.service';

import type { CatalogItem, Page, UserSummary } from '../types/administration.types';
import type { ReactNode } from 'react';

type Resource = 'users' | 'roles' | 'permissions';

const routeNames: Record<Resource, string> = {
  users: 'usuarios',
  roles: 'papeis',
  permissions: 'permissoes',
};

export function AdminList({ resource, title }: { resource: Resource; title: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const query = useQuery<Page<UserSummary | CatalogItem>>({
    queryKey: [resource, page, search],
    queryFn: async () =>
      administrationService[resource](page, search) as Promise<Page<UserSummary | CatalogItem>>,
  });
  const remove = useMutation({
    mutationFn: (id: string) =>
      resource === 'users'
        ? administrationService.deleteUser(id)
        : resource === 'roles'
          ? administrationService.deleteRole(id)
          : administrationService.deletePermission(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });

  if (query.isLoading) return <Spinner label={`Carregando ${title}`} />;
  if (query.isError)
    return (
      <EmptyState title="Não foi possível carregar" description="Tente novamente em instantes." />
    );
  const result = query.data;
  const columns =
    resource === 'users'
      ? [
          { key: 'name', label: 'Nome' },
          { key: 'email', label: 'E-mail' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Ações' },
        ]
      : [
          { key: 'name', label: 'Nome' },
          { key: 'code', label: 'Código' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Ações' },
        ];
  const rows: Array<Record<string, ReactNode>> = (result?.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    ...('email' in item ? { email: item.email } : {}),
    ...('code' in item ? { code: item.code } : {}),
    status:
      'isActive' in item && item.isActive === false
        ? 'Inativo'
        : 'status' in item
          ? item.status
          : 'Ativo',
    actions: (
      <span className="table-actions">
        <Link href={`/admin/${routeNames[resource]}/${item.id}/editar`}>Editar</Link>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            if (window.confirm('Confirma a inativação deste registro?')) remove.mutate(item.id);
          }}
        >
          Inativar
        </Button>
      </span>
    ),
  }));

  return (
    <section className="admin-page">
      <header className="page-heading">
        <div>
          <span className="eyebrow">Administração</span>
          <h1>{title}</h1>
        </div>
        <Button asChild>
          <Link href={`/admin/${routeNames[resource]}/novo`}>Novo</Link>
        </Button>
      </header>
      <SearchInput
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
        placeholder="Pesquisar"
      />
      {rows.length ? (
        <DataTable columns={columns} rows={rows} />
      ) : (
        <EmptyState
          title={search ? 'Nenhum resultado' : `Nenhum registro em ${title}`}
          description={search ? 'Revise os filtros informados.' : 'Cadastre o primeiro registro.'}
        />
      )}
      <Pagination
        page={page}
        totalPages={Math.max(1, result?.pagination.totalPages ?? 1)}
        onPageChange={setPage}
      />
    </section>
  );
}
