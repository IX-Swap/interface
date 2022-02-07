import React, { createElement, useState } from 'react'
import { ClickAwayListener, Paper, Popper } from '@mui/material'
import { bindPopper, InjectedProps } from 'material-ui-popup-state'
import { useStyles } from 'app/components/Dropdown/DropdownContent.styles'
import { DropdownProps } from 'app/components/Dropdown/Dropdown'

export interface DropdownContentProps {
  popupState: InjectedProps
  arrow: boolean
  placement: DropdownProps['placement']
  children: DropdownProps['content']
}

export const DropdownContent = (props: DropdownContentProps) => {
  const { popupState, arrow, placement, children } = props
  const [arrowRef, setArrowRef] = useState<any>(null)
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
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef
          }
        }
      ]}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper>
          {arrow && <span className={classes.arrow} ref={setArrowRef} />}
          {createElement(children, {
            injectedProps: popupState,
            popperProps
          })}
        </Paper>
      </ClickAwayListener>
    </Popper>
  )
}
