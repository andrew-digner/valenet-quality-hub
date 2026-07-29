export interface RequestFixture {
  headers: Record<string, string>;
}

export const createRequestFixture = (overrides: Partial<RequestFixture> = {}): RequestFixture => ({
  headers: {},
  ...overrides,
});
