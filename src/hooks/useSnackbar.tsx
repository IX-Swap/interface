import React, { ReactNode } from 'react'

import { AppearanceTypes, useToasts } from 'react-toast-notifications'
import { NotificationToast } from 'app/pages/notifications/components/NotificationToast'
import { Notification as TNotification } from 'types/notification'
import { Snackbar } from './Snackbar'

export interface SnackbarService {
  showSnackbar: (message: ReactNode, variant?: AppearanceTypes) => any
  showNotification: (notification: TNotification) => any
}

export const useSnackbar = (): SnackbarService => {
  const { addToast, toastStack } = useToasts()

  return {
    showSnackbar: (
      message: ReactNode,
      variant: AppearanceTypes = 'success'
    ) => {
      if (
        toastStack.length > 0 &&
        (toastStack[toastStack.length - 1].content as any).props.message ===
          message
      ) {
        return
      }
      return addToast(<Snackbar message={message} variant={variant} />, {
        appearance: variant,
        autoDismiss: true
      })
    },
    showNotification: (notification: TNotification) => {
      return addToast(<NotificationToast data={notification} />)
    }
  }
}
