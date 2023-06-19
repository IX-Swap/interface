type Base = Record<string, string | undefined>

export interface UpdateUserRoleArgs extends Base {
  userId?: string
  newUserRoles?: string
  newInvestorRoles?: string
  // roles: string
}
