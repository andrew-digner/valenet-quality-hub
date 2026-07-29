export interface Page<T> {
  data: T[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface UserSummary {
  id: string;
  name: string;
  registration: string;
  email: string;
  status: string;
  team?: { name: string };
  roles: Array<{ role: { name: string } }>;
}

export interface CatalogItem {
  id: string;
  name: string;
  code: string;
  module?: string;
  isActive: boolean;
  _count?: { users?: number; permissions?: number; roles?: number };
}
