import React, { useState } from 'react'
import { ClickAwayListener, Grid, Popper } from '@material-ui/core'

interface DropdownMenuProps {
  toggle: JSX.Element
  content: JSX.Element
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  toggle,
  content
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const opened = Boolean(anchorEl)
  const togglePopper = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(anchorEl !== null ? null : event.currentTarget)
  }
  const handleClickAway = (): void => setAnchorEl(null)

  return (
    <Grid container>
      <Popper
        open={opened}
        anchorEl={anchorEl}
        placement='bottom-end'
        modifiers={{
          flip: {
            enabled: false
          }
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          {content}
        </ClickAwayListener>
      </Popper>
      <div onClick={togglePopper}>{toggle}</div>
    </Grid>
  )
}

export default DropdownMenu
