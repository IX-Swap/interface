import { useServices } from 'v2/services/useServices'
import { useBeforeUnload } from 'v2/hooks/useBeforeUnload'
import { useEffect, useState } from 'react'
import { useUser } from 'v2/auth/hooks/useUser'
import { useIsAccredited } from 'v2/helpers/acl'
import { useAccessToken } from 'v2/hooks/auth/useAccessToken'

export const useAppInit = () => {
  const { socketService } = useServices()
  const accessToken = useAccessToken()
  const isAccredited = useIsAccredited()
  const [getUser, { data, isLoading }] = useUser()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const user = data?.data

  useEffect(() => {
    if (accessToken === undefined) {
      setIsAuthenticated(false)
    } else {
      if (user === undefined) {
        if (!isLoading) {
          void getUser()
        } else {
          setIsAuthenticated(false)
        }
      } else {
        if (isAccredited) {
          socketService.subscribeToSocket(accessToken)
        }

        setIsAuthenticated(true)
      }
    }
  }, [
    user,
    socketService,
    isLoading,
    setIsAuthenticated,
    accessToken,
    getUser,
    isAccredited
  ])

  useBeforeUnload(() => {
    socketService.disconnect()
  })

  return {
    isLoading: accessToken === undefined ? false : isLoading,
    isAuthenticated
  }
}
