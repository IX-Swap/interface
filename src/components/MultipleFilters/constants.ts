import { ROLES, ROLES_LABEL } from 'constants/roles'

export enum FILTERS {
  SEARCH = 'search',
  ROLES = 'roles',
  SEC_TOKENS = 'tokens',
}

export const defaultValues = {
  search: '',
  roles: [],
  tokens: [],
} as Record<string, any>

export const rolesOptions = [
  { label: ROLES_LABEL[ROLES.ADMIN], value: ROLES.ADMIN },
  { label: ROLES_LABEL[ROLES.OPERATOR], value: ROLES.OPERATOR },
  { label: ROLES_LABEL[ROLES.TOKEN_MANAGER], value: ROLES.TOKEN_MANAGER },
  { label: ROLES_LABEL[ROLES.USER], value: ROLES.USER },
]
