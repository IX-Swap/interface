import React, { createElement, FunctionComponent } from 'react'
import PopupState, {
  bindPopper,
  bindTrigger,
  InjectedProps
} from 'material-ui-popup-state'
import { DropdownContent } from 'app/components/Dropdown/DropdownContent'
import { ThemeProvider } from '@material-ui/styles'
import themes from 'themes'
import { PopperPlacementType } from '@material-ui/core'

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
  contentTheme?: keyof typeof themes
}

export const Dropdown = (props: DropdownProps) => {
  const {
    content,
    trigger,
    arrow = false,
    placement = 'bottom-end',
    contentTheme = 'default'
  } = props

  return (
    <PopupState variant='popper'>
      {popupState => (
        <>
          {createElement(trigger, {
            triggerProps: bindTrigger(popupState),
            injectedProps: popupState
          })}

          <ThemeProvider theme={themes[contentTheme]}>
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
