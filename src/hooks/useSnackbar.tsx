import React, { ReactNode, createElement, FunctionComponent } from 'react'
import { AppearanceTypes, useToasts } from 'react-toast-notifications'
import { NotificationToast } from 'app/pages/notifications/components/NotificationToast'
import { Notification as TNotification } from 'types/notification'
import { Snackbar } from './Snackbar'
import { useQueryCache } from 'react-query'
import { identityQueryKeys } from 'config/queryKeys'
import apiService from 'services/api'
import storageService from 'services/storage'
import User from 'types/user'
import { userURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'

export interface SnackbarService {
  showSnackbar: (message: ReactNode, variant?: AppearanceTypes) => any
  showNotification: (notification: TNotification) => any
  showDialog: (component: FunctionComponent) => any
}

export const useSnackbar = (): SnackbarService => {
  const { addToast, toastStack } = useToasts()
  const queryCache = useQueryCache()

  const showDialog = (component: FunctionComponent) => {
    return addToast(createElement(component), {
      appearance: 'info',
      autoDismiss: false
    })
  }

  const handleOnboardingComplete = (notification: TNotification) => {
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

      if (waitingForInvestorApproval || waitingForIssuerApproval) {
        const user = storageService.get<User>('user')

        void apiService
          .get(userURL.getUserProfile(getIdFromObj(user)))
          .then(data => {
            storageService.set('user', data.data)
            storageService.set('visitedUrl', [])
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
        handleOnboardingComplete(notification)
      }
      return showAllNotifications()
    },
    showDialog: showDialog
  }
}
