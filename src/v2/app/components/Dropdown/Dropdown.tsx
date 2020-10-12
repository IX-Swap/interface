import React, { createElement, FunctionComponent } from 'react'
import { Menu } from '@material-ui/core'
import PopupState, {
  bindMenu,
  bindTrigger,
  InjectedProps
} from 'material-ui-popup-state'

export interface DropdownTriggerProps {
  triggerProps: ReturnType<typeof bindTrigger>
  injectedProps: InjectedProps
}

export interface DropdownContentProps {
  menuProps: ReturnType<typeof bindMenu>
  injectedProps: InjectedProps
}

export interface DropdownProps {
  trigger: FunctionComponent<DropdownTriggerProps>
  content: FunctionComponent<DropdownContentProps>
}

export const Dropdown = (props: DropdownProps) => {
  const { content, trigger } = props

  return (
    <PopupState variant='popper'>
      {popupState => {
        const menuProps = bindMenu(popupState)

        return (
          <>
            {createElement(trigger, {
              triggerProps: bindTrigger(popupState),
              injectedProps: popupState
            })}

            <Menu
              {...menuProps}
              id='notifications-dropdown'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                horizontal: 'right',
                vertical: 'top'
              }}
            >
              {createElement(content, {
                injectedProps: popupState,
                menuProps
              })}
            </Menu>
          </>
        )
      }}
    </PopupState>
  )
}
