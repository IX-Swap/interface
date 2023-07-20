import { ClickAwayListener, Paper, Popper } from '@mui/material'
import { DropdownProps } from 'app/components/Dropdown/Dropdown'
import { useStyles } from 'app/components/Dropdown/DropdownContent.styles'
import { bindPopper, InjectedProps } from 'material-ui-popup-state'
import React, { createElement } from 'react'
// import { useTheme } from '@mui/styles'

export interface DropdownContentProps {
  popupState: InjectedProps
  arrow: boolean
  placement: DropdownProps['placement']
  children: DropdownProps['content']
  anchorEl: any
}

export const DropdownContent = (props: DropdownContentProps) => {
  const { popupState, placement, children, anchorEl } = props
  const classes = useStyles()
  const popperProps = bindPopper(popupState)
  const handleClickAway = () => {
    if (popupState.isOpen) {
      popupState.close()
    }
  }

  //   const theme = useTheme()

  return (
    <Popper
      {...bindPopper(popupState)}
      placement={placement}
      className={classes.popper}
      disablePortal
      anchorEl={anchorEl.current}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper
        //   sx={{
        //     border: `1px solid ${theme.palette.table.border}`,
        //     padding: '0 20px'
        //   }}
        >
          {createElement(children, {
            injectedProps: popupState,
            popperProps
          })}
        </Paper>
      </ClickAwayListener>
    </Popper>
  )
}
