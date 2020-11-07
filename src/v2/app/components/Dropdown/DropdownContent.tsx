import React, { createElement, useState } from 'react'
import { ClickAwayListener, Fade, Paper, Popper } from '@material-ui/core'
import { bindPopper, InjectedProps } from 'material-ui-popup-state'
import { useStyles } from 'v2/app/components/Dropdown/DropdownContent.styles'
import { DropdownProps } from 'v2/app/components/Dropdown/Dropdown'

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
      transition
      disablePortal={false}
      placement={placement}
      className={classes.popper}
      modifiers={{
        flip: {
          enabled: false
        },
        preventOverflow: {
          enabled: false,
          boundariesElement: 'scrollParent'
        },
        arrow: {
          enabled: arrow,
          element: arrowRef
        }
      }}
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              {arrow && <span className={classes.arrow} ref={setArrowRef} />}
              {createElement(children, {
                injectedProps: popupState,
                popperProps
              })}
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  )
}
