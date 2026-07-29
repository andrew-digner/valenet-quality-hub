export const createApiSuccess = <T>(data: T) => ({
  data,
  success: true as const,
});
