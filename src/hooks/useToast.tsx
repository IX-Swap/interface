import React, { ReactNode, ReactText } from 'react'
import {
  toast,
  TypeOptions,
  CloseButtonProps,
  ToastOptions
} from 'react-toastify'
import { ReactComponent as SuccessIcon } from 'assets/icons/alerts/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/icons/alerts/error.svg'
import { ReactComponent as InfoIcon } from 'assets/icons/alerts/info.svg'
import { ReactComponent as WarningIcon } from 'assets/icons/alerts/warning.svg'
import { Icon } from 'ui/Icons/Icon'
import { AlertContent } from 'ui/Alerts/AlertsContent/AlertsContent'
import {
  Notification as TNotification,
  NotificationType
} from 'types/notification'
import { AppFeature } from 'types/app'
import { useHistory } from 'react-router-dom'

export interface Action {
  buttonText: string | JSX.Element
  callback: () => void
}

export type Actions = [] | [Action] | [Action, Action]

export interface ToastService {
  showToast: (
    message: ReactNode,
    type?: TypeOptions,
    wihLoading?: boolean,
    actions?: Actions
  ) => void
  showNotification: (notification: TNotification) => any
}

const CloseIcon = ({ closeToast }: CloseButtonProps) => (
  <Icon name={'close'} onClick={closeToast} size={17} />
)

const getToastIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return SuccessIcon
    case 'error':
      return ErrorIcon
    case 'info':
      return InfoIcon
    case 'warning':
      return WarningIcon
    default:
      return SuccessIcon
  }
}

const getToastOptions = (
  type: NotificationType,
  withLoading: boolean,
  toastId: ReactText,
  actions: Action[]
) => {
  const defaultWidth = 320
  const hasActions = actions.length > 0

  return {
    position: 'bottom-right',
    type: type,
    hideProgressBar: !withLoading,
    icon: getToastIcon(type),
    closeButton: CloseIcon,
    toastId: toastId,
    autoClose: !hasActions ? 3000 : false,
    style: { width: hasActions ? 'initial' : defaultWidth }
  } as ToastOptions
}

export const useToast = (): ToastService => {
  const { push } = useHistory()

  return {
    showToast: (
      message,
      type = 'success',
      withLoading = false,
      actions = []
    ) => {
      const currentToastId = [
        message,
        type,
        withLoading,
        actions.map(item => item.buttonText)
      ].join()

      return toast(
        <AlertContent message={message} actions={actions} />,
        getToastOptions(type, withLoading, currentToastId, actions)
      )
    },
    showNotification: (notification: TNotification) => {
      // TODO make sure backend and frontend have the agreement on this schema to avoid extra checks
      let url = `/app/${notification.service}/${notification.feature}/${notification.resourceId}/view`

      if (notification.feature === AppFeature.Commitments) {
        url = `/app/invest/${notification.feature}/${notification.resourceId}/view`
      }

      if (notification.feature === AppFeature.Individuals) {
        url = `/app/identity/${notification.feature}/view`
      }

      if (
        notification.feature === AppFeature.Deposits ||
        notification.feature === AppFeature.Withdrawals ||
        notification.feature === AppFeature.DigitalSecurityWithdrawals ||
        notification.feature === AppFeature.Authentication ||
        (notification?.service?.toUpperCase() === 'EXCHANGE' &&
          notification?.subject?.toUpperCase() === 'ORDER CREATED')
      ) {
        return null
      }

      const actions: Actions = [
        {
          buttonText: <Icon name={'arrow-right'} />,
          callback: () => push(url)
        }
      ]

      // TODO Need to check in the future what information besides the message to display
      return toast(
        <AlertContent
          message={notification.message}
          actions={actions}
          fullWidth
        />,
        getToastOptions(notification.type, false, 'toastId', actions)
      )
    }
  }
}
