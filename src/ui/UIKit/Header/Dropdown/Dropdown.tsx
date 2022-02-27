import React, { createElement, FunctionComponent } from 'react'
import PopupState, {
  bindPopper,
  bindTrigger,
  InjectedProps
} from 'material-ui-popup-state'
import { PopperPlacementType } from '@mui/material'
import { DropdownContent } from 'ui/UIKit/Header/Dropdown/DropdownContent'

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
  placement?: PopperPlacementType
  contentTheme?: 'light' | 'dark'
}

export const Dropdown = (props: DropdownProps) => {
  const { content, trigger, placement = 'bottom-end' } = props

  return (
    <PopupState variant='popper'>
      {popupState => (
        <>
          {createElement(trigger, {
            triggerProps: bindTrigger(popupState),
            injectedProps: popupState
          })}
          <DropdownContent popupState={popupState} placement={placement}>
            {content}
          </DropdownContent>
        </>
      )}
    </PopupState>
  )
}
