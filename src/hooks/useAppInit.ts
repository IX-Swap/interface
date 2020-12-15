import { useServices } from 'hooks/useServices'
import { useBeforeUnload } from 'hooks/useBeforeUnload'
import { useEffect } from 'react'
import { useUser } from 'auth/hooks/useUser'
import { useAccessToken } from 'hooks/auth/useAccessToken'
import { AppRole, hasRole } from 'helpers/acl'
import { useQueryCache } from 'react-query'

export const useAppInit = () => {
  const { socketService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const accessToken = useAccessToken()
  const [getUser, { data, isLoading, isIdle, isError, isSuccess }] = useUser()
  const user = data?.data
  const isAccredited = hasRole(user?.roles, AppRole.ACCREDITED)

  useEffect(() => {
    if (isIdle && !isLoading && !(isError || isSuccess)) {
      void getUser()
    } else {
      if (isSuccess) {
        if (accessToken !== undefined) {
          socketService.subscribeToSocket(
            accessToken,
            snackbarService.showNotification,
            queryCache
          )
        }
      }
    }
  }, [
    snackbarService.showNotification,
    user,
    socketService,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    accessToken,
    getUser,
    isAccredited,
    queryCache
  ])

  useBeforeUnload(() => {
    socketService.disconnect()
  })

  return {
    isSuccess,
    isFinished: accessToken === undefined ? true : isError || isSuccess
  }
}
