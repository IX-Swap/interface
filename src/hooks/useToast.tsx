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
import apiService from 'services/api'
import storageService from 'services/storage'
import User from 'types/user'
import { userURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'

export interface ToastService {
  showSnackbar: (message: ReactNode, variant?: AppearanceTypes) => any
  showNotification: (notification: TNotification) => any
  showOnboardingDialog: (onboardingDialog: OnboardingDialogProps) => any
}

export const useToast = (): ToastService => {
  const { addToast, toastStack } = useToasts()
  const queryCache = useQueryCache()

  const showOnboardingDialog = (onboardingDialog: OnboardingDialogProps) => {
    return addToast(<OnboardingDialog {...onboardingDialog} />, {
      appearance: 'info',
      autoDismiss: false
    })
  }

  const showOnboardingCompleteDialog = (notification: TNotification) => {
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
      const item = JSON.parse(
        localStorage.getItem(notification.resourceId) ?? ''
      )
      const waitingForIssuerApproval = item === 'issuer'
      const waitingForInvestorApproval =
        item === 'individual' || item === 'investor'

      const completeDialog = {
        title: 'Onboarding Complete!',
        message: [
          `You have completed the Onboarding journey. Our authorizer has approved your identity. ${
            waitingForIssuerApproval ? '' : 'Happy investing!'
          }`
        ],
        actionLabel: 'Okay',
        action: waitingForIssuerApproval
          ? '/app/educationCentre'
          : '/app/invest'
      }

      if (waitingForInvestorApproval || waitingForIssuerApproval) {
        const user = storageService.get<User>('user')

        void apiService
          .get(userURL.getUserProfile(getIdFromObj(user)))
          .then(data => {
            storageService.set('user', data.data)
            storageService.set('visitedUrl', [])

            addToast(<OnboardingDialog {...completeDialog} />, {
              appearance: 'info',
              autoDismiss: false
            })

            localStorage.removeItem(notification.resourceId)
          })
      }
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
