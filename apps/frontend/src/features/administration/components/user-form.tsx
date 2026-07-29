'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Card, CardContent, FormField, Input } from '@valenet/ui';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { administrationService } from '../services/administration.service';

const schema = z.object({
  name: z.string().min(2, 'Informe o nome.'),
  registration: z.string().min(1, 'Informe a matrícula.'),
  email: z.email('Informe um e-mail válido.'),
  phone: z.string().optional(),
  companyId: z.uuid('Selecione a empresa.'),
  areaId: z.uuid('Selecione a área.'),
  teamId: z.uuid('Selecione a equipe.'),
  roleIds: z.array(z.uuid()).min(1, 'Selecione ao menos um papel.'),
});
type Values = z.infer<typeof schema>;

export function UserForm({ id, initialValues }: { id?: string; initialValues?: Partial<Values> }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      registration: '',
      email: '',
      phone: '',
      companyId: '',
      areaId: '',
      teamId: '',
      roleIds: [],
      ...initialValues,
    },
  });
  const mutation = useMutation({
    mutationFn: (values: Values) =>
      id ? administrationService.updateUser(id, values) : administrationService.createUser(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      router.push('/admin/usuarios');
    },
  });

  return (
    <Card className="form-card">
      <CardContent>
        <form
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          className="form-grid"
        >
          {mutation.isError ? (
            <Alert>Não foi possível salvar. Revise os dados informados.</Alert>
          ) : null}
          {(
            ['name', 'registration', 'email', 'phone', 'companyId', 'areaId', 'teamId'] as const
          ).map((field) => (
            <FormField
              key={field}
              label={
                {
                  name: 'Nome',
                  registration: 'Matrícula',
                  email: 'E-mail corporativo',
                  phone: 'Telefone',
                  companyId: 'Empresa (ID)',
                  areaId: 'Área (ID)',
                  teamId: 'Equipe (ID)',
                }[field]
              }
              {...(form.formState.errors[field]?.message
                ? { error: form.formState.errors[field]?.message }
                : {})}
            >
              <Input {...form.register(field)} disabled={field === 'registration' && Boolean(id)} />
            </FormField>
          ))}
          <FormField
            label="Papéis (IDs separados por vírgula)"
            {...(form.formState.errors.roleIds?.message
              ? { error: form.formState.errors.roleIds.message }
              : {})}
          >
            <Input
              defaultValue={initialValues?.roleIds?.join(',')}
              onChange={(event) =>
                form.setValue(
                  'roleIds',
                  event.target.value
                    .split(',')
                    .map((value) => value.trim())
                    .filter(Boolean),
                )
              }
            />
          </FormField>
          <div className="form-actions">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button disabled={mutation.isPending} type="submit">
              {mutation.isPending ? 'Salvando…' : 'Salvar usuário'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
