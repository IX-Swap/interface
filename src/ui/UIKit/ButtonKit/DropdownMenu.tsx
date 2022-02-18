import { Button, Divider, Box, Menu, MenuItem } from '@mui/material'
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export interface DropdownMenuProps {
  buttonSize?: 'small' | 'medium' | 'large'
  buttonVariant?: 'text' | 'outlined' | 'contained' | 'alternate'
  disabled?: boolean
}

export const DropdownMenu = ({
  buttonSize = 'medium',
  buttonVariant = 'outlined',
  disabled = false
}: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box pb={30} pl={7}>
      <Button
        variant={buttonVariant}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        size={buttonSize}
        disabled={disabled}
      >
        Options
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ padding: 20 }}
      >
        <MenuItem onClick={handleClose} disableRipple>
          Invest Primary
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          Invest Secondary
        </MenuItem>
      </Menu>
    </Box>
  )
}
