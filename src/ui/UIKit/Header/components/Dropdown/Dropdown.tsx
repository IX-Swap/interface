import React, { createElement, FunctionComponent } from 'react'
import PopupState, {
  bindPopper,
  bindToggle,
  InjectedProps
} from 'material-ui-popup-state'
import { PopperPlacementType } from '@mui/material'
import { DropdownContent } from 'ui/UIKit/Header/components/Dropdown/DropdownContent'

export interface DropdownTriggerProps {
  triggerProps: ReturnType<typeof bindToggle>
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
            triggerProps: bindToggle(popupState),
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
