'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Card, CardContent, CardHeader, FormField, Input } from '@valenet/ui';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { apiClient } from '../../services/api-client';
import { useAuthStore } from '../../stores/auth.store';

const schema = z.object({
  email: z.email('Informe um e-mail válido.'),
  password: z.string().min(8, 'A senha deve possuir ao menos 8 caracteres.'),
});
type LoginValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);
  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });
  const submit = async (values: LoginValues) => {
    try {
      const response = await apiClient.post('/auth/sessions', values);
      const tokens = response.data.data as { accessToken: string; refreshToken: string };
      setTokens(tokens.accessToken, tokens.refreshToken);
      router.push('/');
    } catch {
      form.setError('root', { message: 'E-mail ou senha inválidos.' });
    }
  };
  return (
    <Card className="login-card">
      <CardHeader>
        <span className="eyebrow">Valenet Quality Hub</span>
        <h1>Entrar</h1>
        <p>Acesse o ambiente administrativo.</p>
      </CardHeader>
      <CardContent>
        <form className="form-grid" onSubmit={form.handleSubmit(submit)}>
          {form.formState.errors.root ? <Alert>{form.formState.errors.root.message}</Alert> : null}
          <FormField
            label="E-mail corporativo"
            {...(form.formState.errors.email?.message
              ? { error: form.formState.errors.email.message }
              : {})}
          >
            <Input autoComplete="email" {...form.register('email')} />
          </FormField>
          <FormField
            label="Senha"
            {...(form.formState.errors.password?.message
              ? { error: form.formState.errors.password.message }
              : {})}
          >
            <Input autoComplete="current-password" type="password" {...form.register('password')} />
          </FormField>
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
