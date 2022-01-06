type Base = Record<string, string | undefined>

export interface UpdateUserRoleArgs extends Base {
  userId?: string
  roles: string
}
