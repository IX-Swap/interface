import { useServices } from 'hooks/useServices'
import { useBeforeUnload } from 'hooks/useBeforeUnload'
import { useEffect } from 'react'
import { useUser } from 'auth/hooks/useUser'
import { useTenant } from 'auth/hooks/useTenant'
import { AppRole, hasRole } from 'helpers/acl'
import { useQueryCache } from 'react-query'

export const useAppInit = () => {
  const { socketService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const [getUser, { data, isLoading, isIdle, isError, isSuccess }] = useUser()
  const user = data?.data
  const isAccredited = hasRole(user?.roles, AppRole.ACCREDITED)

  useTenant()

  useEffect(() => {
    if (isIdle && !isLoading && !(isError || isSuccess)) {
      void getUser()
    } else {
      if (isSuccess) {
        socketService.subscribeToSocket(
          snackbarService.showNotification,
          queryCache
        )
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
    getUser,
    isAccredited,
    queryCache
  ])

  useBeforeUnload(() => {
    socketService.disconnect()
  })

  return {
    isSuccess,
    isFinished: isError || isSuccess
  }
}
