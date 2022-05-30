export enum ROLES {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  TOKEN_MANAGER = 'token-manager',
  USER = 'user',
}

export const ROLES_LABEL = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.OPERATOR]: 'Operator',
  [ROLES.TOKEN_MANAGER]: 'Token Manager',
  [ROLES.USER]: 'User',
} as Record<string, string>
