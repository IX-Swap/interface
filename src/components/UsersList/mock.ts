import { ROLES, ROLES_LABEL } from 'constants/roles'

export const adminRoles = [
  { label: ROLES_LABEL[ROLES.ADMIN], value: ROLES.ADMIN },
  { label: ROLES_LABEL[ROLES.OPERATOR], value: ROLES.OPERATOR },
  { label: ROLES_LABEL[ROLES.TOKEN_MANAGER], value: ROLES.TOKEN_MANAGER },
  { label: ROLES_LABEL[ROLES.OFFER_MANAGER], value: ROLES.OFFER_MANAGER },
  { label: ROLES_LABEL[ROLES.USER], value: ROLES.USER },
  { label: ROLES_LABEL[ROLES.MASTER_TENANT], value: ROLES.MASTER_TENANT },
]
