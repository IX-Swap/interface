import React, { ReactNode } from 'react'

import { AppearanceTypes, useToasts } from 'react-toast-notifications'
import { NotificationToast } from 'app/pages/notifications/components/NotificationToast'
import { Notification as TNotification } from 'types/notification'
import { Snackbar } from './Snackbar'
import {
  OnboardingDialog,
  OnboardingDialogProps
} from 'app/components/OnboardingDialog/OnboardingDialog'
import { useQueryCache } from 'react-query'
import { identityQueryKeys } from 'config/queryKeys'

export interface SnackbarService {
  showSnackbar: (message: ReactNode, variant?: AppearanceTypes) => any
  showNotification: (notification: TNotification) => any
  showOnboardingDialog: (onboardingDialog: OnboardingDialogProps) => any
}

export const useSnackbar = (): SnackbarService => {
  const { addToast, toastStack } = useToasts()
  const queryCache = useQueryCache()

  const completeDialog = {
    title: 'Onboarding Complete!',
    message: [
      'You have complete the Onboarding journey. Our authorizer will review your identity and notify your status. You can start looking our deals in the “Invest” panel. Happy Investing!'
    ],
    actionLabel: 'Start Investing',
    action: '/app/invest'
  }

  const showOnboardingDialog = (onboardingDialog: OnboardingDialogProps) => {
    return addToast(<OnboardingDialog {...onboardingDialog} />, {
      appearance: 'info',
      autoDismiss: false
    })
  }

  const showOnboardingCompleteDialog = (notification: TNotification) => {
    // To do: determine if user is still in onboarding process
    const individualIdentityApproved =
      notification.feature === 'individuals' &&
      notification.subject === 'Identity Approved'
    const corporateIdentityApproved =
      notification.feature === 'corporates' &&
      notification.subject === 'Corporate Identity Approved'

    if (individualIdentityApproved) {
      void queryCache.invalidateQueries(identityQueryKeys.getIndividual)
    }

    if (corporateIdentityApproved) {
      void queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)
    }

    if (individualIdentityApproved || corporateIdentityApproved) {
      addToast(<OnboardingDialog {...completeDialog} />, {
        appearance: 'info',
        autoDismiss: false
      })
    }
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
        showOnboardingCompleteDialog(notification)
      }
      return showAllNotifications()
    },
    showOnboardingDialog: showOnboardingDialog
  }
}
