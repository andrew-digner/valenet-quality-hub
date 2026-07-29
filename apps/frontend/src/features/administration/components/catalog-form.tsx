'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Card, CardContent, FormField, Input, Textarea } from '@valenet/ui';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { administrationService } from '../services/administration.service';

import type { CatalogFormData, OrganizationResource } from '../services/administration.service';

type Kind = 'role' | 'permission' | OrganizationResource;
const schema = z.object({
  name: z.string().min(2, 'Informe o nome.'),
  code: z.string().optional(),
  description: z.string().optional(),
  hierarchy: z.number().int().min(0).optional(),
  permissionIdsText: z.string().optional(),
  module: z.string().optional(),
  resource: z.string().optional(),
  action: z.string().optional(),
  companyId: z.string().optional(),
  unitId: z.string().optional(),
  areaId: z.string().optional(),
  tradeName: z.string().optional(),
  document: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export function CatalogForm({
  id,
  kind,
  initialValues,
}: {
  id?: string;
  kind: Kind;
  initialValues?: Partial<Values>;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', code: '', description: '', hierarchy: 0, ...initialValues },
  });
  const mutation = useMutation({
    mutationFn: async (values: Values) => {
      const { permissionIdsText, ...rest } = values;
      const data: CatalogFormData = {
        ...rest,
        ...(permissionIdsText
          ? {
              permissionIds: permissionIdsText
                .split(',')
                .map((value) => value.trim())
                .filter(Boolean),
            }
          : {}),
      };
      if (kind === 'role') {
        if (!id) return administrationService.createRole(data);
        const role = await administrationService.updateRole(id, data);
        if (data.permissionIds) {
          await administrationService.setRolePermissions(id, data.permissionIds);
        }
        return role;
      }
      if (kind === 'permission')
        return id
          ? administrationService.updatePermission(id, data)
          : administrationService.createPermission(data);
      return id
        ? administrationService.updateOrganization(kind, id, data)
        : administrationService.createOrganization(kind, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      router.back();
    },
  });

  const fields: Array<{ name: keyof Values; label: string }> = [
    { name: 'name', label: 'Nome' },
    ...(!id ? [{ name: 'code' as const, label: 'Código' }] : []),
    ...(kind === 'role'
      ? [
          { name: 'hierarchy' as const, label: 'Nível hierárquico' },
          {
            name: 'permissionIdsText' as const,
            label: 'IDs das permissões (separados por vírgula)',
          },
        ]
      : []),
    ...(kind === 'permission'
      ? [
          { name: 'module' as const, label: 'Módulo' },
          { name: 'resource' as const, label: 'Recurso' },
          { name: 'action' as const, label: 'Ação' },
        ]
      : []),
    ...(['units', 'areas', 'positions'].includes(kind)
      ? [{ name: 'companyId' as const, label: 'Empresa (ID)' }]
      : []),
    ...(kind === 'areas' ? [{ name: 'unitId' as const, label: 'Unidade (ID)' }] : []),
    ...(kind === 'teams' ? [{ name: 'areaId' as const, label: 'Área (ID)' }] : []),
    ...(kind === 'companies'
      ? [
          { name: 'tradeName' as const, label: 'Nome fantasia' },
          { name: 'document' as const, label: 'CNPJ' },
        ]
      : []),
    ...(kind === 'units'
      ? [
          { name: 'city' as const, label: 'Cidade' },
          { name: 'state' as const, label: 'UF' },
        ]
      : []),
  ];

  return (
    <Card className="form-card">
      <CardContent>
        <form
          className="form-grid"
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        >
          {mutation.isError ? <Alert>Não foi possível salvar. Revise os dados.</Alert> : null}
          {fields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              {...(form.formState.errors[field.name]?.message
                ? { error: String(form.formState.errors[field.name]?.message) }
                : {})}
            >
              <Input
                {...form.register(
                  field.name,
                  field.name === 'hierarchy' ? { valueAsNumber: true } : {},
                )}
                disabled={Boolean(id) && field.name === 'code'}
              />
            </FormField>
          ))}
          {(kind === 'role' || kind === 'permission') && (
            <FormField label="Descrição">
              <Textarea {...form.register('description')} />
            </FormField>
          )}
          <div className="form-actions">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Salvando…' : 'Salvar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
