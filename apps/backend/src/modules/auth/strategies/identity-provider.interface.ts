export interface ExternalIdentity {
  email: string;
  providerSubject: string;
}

export interface IdentityProvider {
  exchangeAuthorizationCode(code: string, redirectUri: string): Promise<ExternalIdentity>;
}

export interface EntraIdentityProviderConfiguration {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  scopes: readonly ['openid', 'profile', 'email', 'offline_access'];
}
