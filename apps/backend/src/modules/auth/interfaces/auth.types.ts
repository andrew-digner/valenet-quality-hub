export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
  sessionId: string;
}

export interface RequestMetadata {
  ipAddress: string | undefined;
  userAgent: string | undefined;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
