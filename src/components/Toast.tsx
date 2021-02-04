import { useTheme } from '@material-ui/core/styles'
import React, { cloneElement } from 'react'
import { ToastProps as ReactToastProps } from 'react-toast-notifications'

export interface ToastProps extends ReactToastProps {}

const toastStates = {
  entering: { transform: 'translate3d(0, 0, 0)' },
  entered: { transform: 'translate3d(0,0,0)' },
  exiting: { transform: 'scale(0.66)', opacity: 0 },
  exited: { transform: 'scale(0.66)', opacity: 0 }
}

export const Toast = (props: ToastProps) => {
  const theme = useTheme()

  return (
    <div
      {...props}
      style={{
        transition: `transform ${props.transitionDuration}ms cubic-bezier(0.2, 0, 0, 1), opacity ${props.transitionDuration}ms`,
        border: `1px solid ${theme.palette.divider}`,
        width: 400,
        marginBottom: 10,
        ...toastStates[props.transitionState]
      }}
    >
      {cloneElement(props.children as any, props)}
    </div>
  )
}
