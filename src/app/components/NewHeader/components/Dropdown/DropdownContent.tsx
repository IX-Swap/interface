import React, { createElement } from 'react'
import { ClickAwayListener, Paper, Popper } from '@mui/material'
import { bindPopper, InjectedProps } from 'material-ui-popup-state'
import { useStyles } from 'app/components/NewHeader/components/Dropdown/DropdownContent.styles'
import { DropdownProps } from 'app/components/Dropdown/Dropdown'

export interface DropdownContentProps {
  popupState: InjectedProps
  placement: DropdownProps['placement']
  children: DropdownProps['content']
}

export const DropdownContent = (props: DropdownContentProps) => {
  const { popupState, placement, children } = props
  const classes = useStyles()
  const popperProps = bindPopper(popupState)
  const handleClickAway = () => {
    if (popupState.isOpen) {
      popupState.close()
    }
  }

  return (
    <Popper
      {...bindPopper(popupState)}
      placement={placement}
      className={classes.popper}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper>
          {createElement(children, {
            injectedProps: popupState,
            popperProps
          })}
        </Paper>
      </ClickAwayListener>
    </Popper>
  )
}
