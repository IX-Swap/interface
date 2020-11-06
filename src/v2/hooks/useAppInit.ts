import { useServices } from 'v2/hooks/useServices'
import { useBeforeUnload } from 'v2/hooks/useBeforeUnload'
import { useEffect } from 'react'
import { useUser } from 'v2/auth/hooks/useUser'
import { useAccessToken } from 'v2/hooks/auth/useAccessToken'
import { AppRole, hasRole } from 'v2/helpers/acl'

export const useAppInit = () => {
  const { socketService, snackbarService } = useServices()
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
            snackbarService.showNotification
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
    isAccredited
  ])

  useBeforeUnload(() => {
    socketService.disconnect()
  })

  return {
    isSuccess,
    isFinished: accessToken === undefined ? true : isError || isSuccess
  }
}
