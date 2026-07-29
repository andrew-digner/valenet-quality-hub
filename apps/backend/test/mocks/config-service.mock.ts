export const createConfigServiceMock = (values: Record<string, unknown>) => ({
  get: <T>(key: string, defaultValue?: T): T | undefined =>
    (values[key] as T | undefined) ?? defaultValue,
  getOrThrow: <T>(key: string): T => {
    if (!(key in values)) {
      throw new Error(`Missing test configuration: ${key}`);
    }
    return values[key] as T;
  },
});
