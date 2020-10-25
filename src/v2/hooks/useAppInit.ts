import { useServices } from 'v2/hooks/useServices'
import { useBeforeUnload } from 'v2/hooks/useBeforeUnload'
import { useEffect } from 'react'
import { useUser } from 'v2/auth/hooks/useUser'
import { useIsAccredited } from 'v2/helpers/acl'
import { useAccessToken } from 'v2/hooks/auth/useAccessToken'

export const useAppInit = () => {
  const { socketService } = useServices()
  const accessToken = useAccessToken()
  const isAccredited = useIsAccredited()
  const [getUser, { data, isLoading, isIdle, isError, isSuccess }] = useUser()
  const user = data?.data

  useEffect(() => {
    if (isIdle && !isLoading && !(isError || isSuccess)) {
      void getUser()
    } else {
      if (isSuccess) {
        if (isAccredited && accessToken !== undefined) {
          socketService.subscribeToSocket(accessToken)
        }
      }
    }
  }, [
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
