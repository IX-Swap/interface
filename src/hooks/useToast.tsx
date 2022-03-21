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
import { AlertContent } from 'ui/UIKit/AlertsKit/AlertsContent'

export interface Action {
  buttonText: string
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
}

const CloseIcon = ({ closeToast }: CloseButtonProps) => (
  <Icon name={'close'} onClick={closeToast} size={17} />
)

const getToastIcon = (type: TypeOptions) => {
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
  type: TypeOptions,
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
  return {
    showToast: (
      message,
      type = 'success',
      withLoading = false,
      actions = []
    ) => {
      // TODO Replace to something better in future
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
    }
  }
}
