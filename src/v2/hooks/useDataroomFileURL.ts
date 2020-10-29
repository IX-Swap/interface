import { useAuth } from 'v2/hooks/auth/useAuth'
import { useIsAdmin, useIsAuthorizer } from 'v2/helpers/acl'
import { getIdFromObj } from 'v2/helpers/strings'

export const useDataroomFileURL = (documentId: string, _ownerId?: string) => {
  const { user } = useAuth()
  const isAuthorizer = useIsAuthorizer()
  const isAdmin = useIsAdmin()
  const isSuperUser = isAuthorizer || isAdmin
  const ownerId =
    _ownerId === '' || _ownerId === undefined ? getIdFromObj(user) : _ownerId

  return isSuperUser
    ? `/dataroom/raw/${documentId}`
    : `/dataroom/raw/${ownerId}/${documentId}`
}
