import { apiClient } from '../../../services/api-client';

import type { CatalogItem, Page, UserSummary } from '../types/administration.types';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export const administrationService = {
  users: async (page: number, search: string) =>
    unwrap<Page<UserSummary>>(await apiClient.get('/users', { params: { page, search } })),
  getUser: async (id: string) => unwrap<UserSummary>(await apiClient.get(`/users/${id}`)),
  roles: async (page: number, search: string) =>
    unwrap<Page<CatalogItem>>(await apiClient.get('/roles', { params: { page, search } })),
  permissions: async (page: number, search: string) =>
    unwrap<Page<CatalogItem>>(await apiClient.get('/permissions', { params: { page, search } })),
  createUser: async (data: UserFormData) =>
    unwrap<UserSummary>(await apiClient.post('/users', data)),
  updateUser: async (id: string, data: UserFormData) =>
    unwrap<UserSummary>(await apiClient.put(`/users/${id}`, data)),
  deleteUser: async (id: string) => apiClient.delete(`/users/${id}`),
  getRole: async (id: string) => unwrap<CatalogItem>(await apiClient.get(`/roles/${id}`)),
  createRole: async (data: CatalogFormData) =>
    unwrap<CatalogItem>(await apiClient.post('/roles', data)),
  updateRole: async (id: string, data: CatalogFormData) =>
    unwrap<CatalogItem>(await apiClient.put(`/roles/${id}`, data)),
  setRolePermissions: async (id: string, permissionIds: string[]) =>
    unwrap<CatalogItem>(await apiClient.put(`/roles/${id}/permissions`, { permissionIds })),
  deleteRole: async (id: string) => apiClient.delete(`/roles/${id}`),
  getPermission: async (id: string) =>
    unwrap<CatalogItem>(await apiClient.get(`/permissions/${id}`)),
  createPermission: async (data: CatalogFormData) =>
    unwrap<CatalogItem>(await apiClient.post('/permissions', data)),
  updatePermission: async (id: string, data: CatalogFormData) =>
    unwrap<CatalogItem>(await apiClient.put(`/permissions/${id}`, data)),
  deletePermission: async (id: string) => apiClient.delete(`/permissions/${id}`),
  organization: async (resource: OrganizationResource, page: number, search: string) =>
    unwrap<Page<CatalogItem>>(await apiClient.get(`/${resource}`, { params: { page, search } })),
  getOrganization: async (resource: OrganizationResource, id: string) =>
    unwrap<CatalogItem>(await apiClient.get(`/${resource}/${id}`)),
  createOrganization: async (resource: OrganizationResource, data: CatalogFormData) =>
    unwrap<CatalogItem>(await apiClient.post(`/${resource}`, data)),
  updateOrganization: async (resource: OrganizationResource, id: string, data: CatalogFormData) =>
    unwrap<CatalogItem>(await apiClient.put(`/${resource}/${id}`, data)),
  deleteOrganization: async (resource: OrganizationResource, id: string) =>
    apiClient.delete(`/${resource}/${id}`),
};

export type OrganizationResource = 'companies' | 'units' | 'areas' | 'teams' | 'positions';

export interface CatalogFormData {
  name: string;
  code?: string | undefined;
  description?: string | undefined;
  hierarchy?: number | undefined;
  permissionIds?: string[] | undefined;
  module?: string | undefined;
  resource?: string | undefined;
  action?: string | undefined;
  companyId?: string | undefined;
  unitId?: string | undefined;
  areaId?: string | undefined;
  tradeName?: string | undefined;
  document?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
}

export interface UserFormData {
  name: string;
  registration: string;
  email: string;
  phone?: string | undefined;
  companyId: string;
  areaId: string;
  teamId: string;
  roleIds: string[];
}
