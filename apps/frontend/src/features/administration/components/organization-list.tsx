'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, DataTable, EmptyState, Pagination, SearchInput, Spinner } from '@valenet/ui';
import Link from 'next/link';
import { useState } from 'react';

import { administrationService } from '../services/administration.service';

import type { OrganizationResource } from '../services/administration.service';
import type { ReactNode } from 'react';

const labels: Record<OrganizationResource, string> = {
  companies: 'Empresas',
  units: 'Unidades',
  areas: 'Áreas',
  teams: 'Equipes',
  positions: 'Cargos',
};

export function OrganizationList({ resource }: { resource: OrganizationResource }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const client = useQueryClient();
  const query = useQuery({
    queryKey: ['organization', resource, page, search],
    queryFn: () => administrationService.organization(resource, page, search),
  });
  const remove = useMutation({
    mutationFn: (id: string) => administrationService.deleteOrganization(resource, id),
    onSuccess: () => client.invalidateQueries({ queryKey: ['organization', resource] }),
  });
  if (query.isLoading) return <Spinner />;
  if (query.isError) return <EmptyState title="Falha ao carregar" description="Tente novamente." />;
  const result = query.data;
  const rows: Array<Record<string, ReactNode>> = (result?.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code ?? '—',
    status: item.isActive ? 'Ativo' : 'Inativo',
    actions: (
      <span className="table-actions">
        <Link href={`/admin/estrutura/${resource}/${item.id}/editar`}>Editar</Link>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            if (window.confirm('Confirma a inativação?')) remove.mutate(item.id);
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
        <h2>{labels[resource]}</h2>
        <Button asChild>
          <Link href={`/admin/estrutura/${resource}/novo`}>Novo</Link>
        </Button>
      </header>
      <SearchInput
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
      />
      {rows.length ? (
        <DataTable
          columns={[
            { key: 'name', label: 'Nome' },
            { key: 'code', label: 'Código' },
            { key: 'status', label: 'Status' },
            { key: 'actions', label: 'Ações' },
          ]}
          rows={rows}
        />
      ) : (
        <EmptyState title="Nenhum registro" description="Cadastre o primeiro item." />
      )}
      <Pagination
        page={page}
        totalPages={Math.max(1, result?.pagination.totalPages ?? 1)}
        onPageChange={setPage}
      />
    </section>
  );
}
