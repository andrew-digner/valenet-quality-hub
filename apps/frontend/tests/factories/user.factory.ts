export interface UserFixture {
  id: string;
  name: string;
}

export const createUserFixture = (overrides: Partial<UserFixture> = {}): UserFixture => ({
  id: '00000000-0000-4000-8000-000000000001',
  name: 'Pessoa de Teste',
  ...overrides,
});
