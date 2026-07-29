import {
  OrganizationController,
  PermissionsController,
  RolesController,
  SessionsController,
  UsersController,
} from './administration.controller.js';

const request = { id: 'request', headers: { 'user-agent': 'jest' } };
const user = {
  id: 'user',
  email: 'admin@valenet.local',
  roles: ['ADMIN'],
  permissions: [],
  sessionId: 'session',
};

const createService = () => {
  const names = [
    'listUsers',
    'getUser',
    'createUser',
    'updateUser',
    'setUserStatus',
    'listRoles',
    'getRole',
    'createRole',
    'updateRole',
    'setRolePermissions',
    'deactivateRole',
    'listPermissions',
    'getPermission',
    'createPermission',
    'updatePermission',
    'deactivatePermission',
    'listOrganization',
    'getOrganization',
    'createOrganization',
    'updateOrganization',
    'deactivateOrganization',
    'listSessions',
    'revokeSession',
    'revokeOtherSessions',
  ];
  return Object.fromEntries(names.map((name) => [name, jest.fn().mockResolvedValue({})]));
};

describe('Administration controllers', () => {
  it('delegates every users endpoint', async () => {
    const service = createService();
    const controller = new UsersController(service as never);
    await controller.list({ page: 1, pageSize: 20 }, 'ACTIVE', 'role', 'area', 'team');
    await controller.list({ page: 1, pageSize: 20 });
    await controller.findOne('id');
    await controller.create({} as never, request as never, '127.0.0.1', user);
    await controller.update('id', {}, request as never, '127.0.0.1', user);
    await controller.status('id', { status: 'BLOCKED' }, request as never, '127.0.0.1', user);
    await controller.delete('id', request as never, '127.0.0.1', user);
    expect(service.listUsers).toHaveBeenCalledTimes(2);
    expect(service.setUserStatus).toHaveBeenCalledTimes(2);
  });

  it('delegates every roles endpoint', async () => {
    const service = createService();
    const controller = new RolesController(service as never);
    await controller.list({ page: 1, pageSize: 20 });
    await controller.findOne('id');
    await controller.create({} as never, request as never, 'ip', user);
    await controller.update('id', {}, request as never, 'ip', user);
    await controller.permissions(
      'id',
      { permissionIds: ['permission'] },
      request as never,
      'ip',
      user,
    );
    await controller.deactivate('id', request as never, 'ip', user);
    expect(service.deactivateRole).toHaveBeenCalled();
  });

  it('delegates every permissions endpoint', async () => {
    const service = createService();
    const controller = new PermissionsController(service as never);
    await controller.list({ page: 1, pageSize: 20 });
    await controller.findOne('id');
    await controller.create({} as never, request as never, 'ip', user);
    await controller.update('id', {}, request as never, 'ip', user);
    await controller.deactivate('id', request as never, 'ip', user);
    expect(service.deactivatePermission).toHaveBeenCalled();
  });

  it('delegates every organization endpoint and rejects unknown resources', async () => {
    const service = createService();
    const controller = new OrganizationController(service as never);
    await controller.list('companies', { page: 1, pageSize: 20 });
    await controller.findOne('units', 'id');
    await controller.create('areas', {} as never, request as never, 'ip', user);
    await controller.update('teams', 'id', {}, request as never, 'ip', user);
    await controller.deactivate('positions', 'id', request as never, 'ip', user);
    expect(() => controller.list('invalid' as never, { page: 1, pageSize: 20 })).toThrow();
  });

  it('delegates every session endpoint', async () => {
    const service = createService();
    const controller = new SessionsController(service as never);
    await controller.list();
    await controller.mine(user);
    await controller.revoke('id', request as never, 'ip', user);
    await controller.revokeOthers(user, request as never, 'ip');
    expect(service.listSessions).toHaveBeenCalledTimes(2);
    expect(service.revokeOtherSessions).toHaveBeenCalled();
  });
});
