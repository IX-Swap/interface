import React, { useEffect } from 'react'
import { useServices } from 'v2/hooks/useServices'

export const NotificationsListener = (props: any) => {
  const { snackbarService } = useServices()

  useEffect(() => {
    snackbarService.showSnackbar(<h1>TOAST ADDEDD</h1>, 'error')
  }, [])

  return null
}
