import React, { createElement, FunctionComponent } from 'react'
import PopupState, {
  bindPopper,
  bindTrigger,
  InjectedProps
} from 'material-ui-popup-state'
import { DropdownContent } from 'app/components/Dropdown/DropdownContent'
import { ThemeProvider } from '@material-ui/core/styles'
import { PopperPlacementType, Theme } from '@material-ui/core'
import { darkTheme } from 'themes/dark'
import { createAppTheme } from 'themes'
import { lightTheme } from 'themes/light'
import { useAppTheme } from 'hooks/useAppTheme'

export interface DropdownTriggerProps {
  triggerProps: ReturnType<typeof bindTrigger>
  injectedProps: InjectedProps
}

export interface DropdownContentProps {
  popperProps: ReturnType<typeof bindPopper>
  injectedProps: InjectedProps
}

export interface DropdownProps {
  trigger: FunctionComponent<DropdownTriggerProps>
  content: FunctionComponent<DropdownContentProps>
  arrow?: boolean
  placement?: PopperPlacementType
  contentTheme?: 'light' | 'dark'
}

export const Dropdown = (props: DropdownProps) => {
  const {
    content,
    trigger,
    arrow = false,
    placement = 'bottom-end',
    contentTheme
  } = props
  const defaultTheme = useAppTheme()
  const theme =
    contentTheme === undefined
      ? defaultTheme
      : createAppTheme(contentTheme === 'dark' ? darkTheme : lightTheme)

  return (
    <PopupState variant='popper'>
      {popupState => (
        <>
          {createElement(trigger, {
            triggerProps: bindTrigger(popupState),
            injectedProps: popupState
          })}

          <ThemeProvider theme={theme as Theme}>
            <DropdownContent
              popupState={popupState}
              placement={placement}
              arrow={arrow}
            >
              {content}
            </DropdownContent>
          </ThemeProvider>
        </>
      )}
    </PopupState>
  )
}
