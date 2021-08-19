import { useLogout } from 'auth/hooks/useLogout'
import { idleLogoutTime, idleWarningTime } from 'config/defaults'
import { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'

export const useIdleTimers = () => {
  const [open, setOpen] = useState(false)
  const [logoutTimer, setLogoutTimer] = useState(idleLogoutTime / 1000)

  const logout = useLogout()

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const resetLogoutTimer = () => {
    setLogoutTimer(idleLogoutTime / 1000)
  }

  useEffect(() => {
    if (open) {
      setTimeout(
        () => setLogoutTimer(count => (count > 0 ? count - 1 : count)),
        1000
      )
    }
    if (logoutTimer === 0) {
      void logout()
      closeDialog()
    }
    // eslint-disable-next-line
  }, [open, logoutTimer])

  const handleOnIdle = () => {
    openDialog()
  }

  const handleOnActive = () => {}

  const handleOnAction = () => {}

  const { reset } = useIdleTimer({
    timeout: idleWarningTime,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
    crossTab: {
      emitOnAllTabs: true
    }
  })

  return {
    reset,
    closeDialog,
    openDialog,
    logout,
    resetLogoutTimer,
    logoutTimer,
    open
  }
}
