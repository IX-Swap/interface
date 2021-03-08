import React, { ReactNode } from 'react'

import { AppearanceTypes, useToasts } from 'react-toast-notifications'
import { NotificationToast } from 'app/pages/notifications/components/NotificationToast'
import { Notification as TNotification } from 'types/notification'
import { Snackbar } from './Snackbar'
import {
  OnboardingDialog,
  OnboardingDialogProps
} from 'app/components/OnboardingDialog/OnboardingDialog'

export interface SnackbarService {
  showSnackbar: (message: ReactNode, variant?: AppearanceTypes) => any
  showNotification: (notification: TNotification) => any
  showOnboardingDialog: (onboardingDialog: OnboardingDialogProps) => any
}

export const useSnackbar = (): SnackbarService => {
  const { addToast, toastStack } = useToasts()

  const completeDialog = {
    title: 'Onboarding Complete!',
    message: [
      'You have complete the Onboarding journey. Our authorizer will review your identity and notify your status. You can start looking our deals in the “Invest” panel. Happy Investing!'
    ],
    actionLabel: 'Start Investing',
    action: '/app/invest'
  }

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
      const showAllNotifications = () => {
        addToast(<NotificationToast data={notification} />)
        // To do: determine if user is still in onboarding process
        if (
          (notification.feature === 'individuals' &&
            notification.subject === 'Identity Approved') ||
          (notification.feature === 'corporates' &&
            notification.subject === 'Corporate Identity Approved')
        ) {
          addToast(<OnboardingDialog {...completeDialog} />, {
            appearance: 'info',
            autoDismiss: false
          })
        }
      }
      return showAllNotifications()
    },
    showOnboardingDialog: (onboardingDialog: OnboardingDialogProps) => {
      // To do: determine if user is still in onboarding process
      return addToast(<OnboardingDialog {...onboardingDialog} />, {
        appearance: 'info',
        autoDismiss: false
      })
    }
  }
}
