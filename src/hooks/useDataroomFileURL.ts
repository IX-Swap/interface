import { useAuth } from 'hooks/auth/useAuth'
import { useIsAdmin, useIsAuthorizer } from 'helpers/acl'
import { getIdFromObj } from 'helpers/strings'

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
