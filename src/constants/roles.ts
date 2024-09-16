export enum ROLES {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  TOKEN_MANAGER = 'token-manager',
  OFFER_MANAGER = 'offer-manager',
  USER = 'user',
  MASTER_TENANT = 'master-tenant',
}

export const ROLES_LABEL = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.OPERATOR]: 'Operator',
  [ROLES.TOKEN_MANAGER]: 'Token Manager',
  [ROLES.OFFER_MANAGER]: 'Offer Manager',
  [ROLES.USER]: 'User',
  [ROLES.MASTER_TENANT]: 'Master Tenant',
} as Record<string, string>
