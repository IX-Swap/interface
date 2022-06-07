import React from 'react'
import { Box, Menu, MenuItem } from '@mui/material'
import { InternalRouteProps } from 'types/util'
import { TopbarLinkContainer } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer'
import { useStyles } from 'app/components/Header/components/Navigation/TopbarLinkDropdown/TopbarLinkDropdown.styles'

export interface TopbarLinkDropdownProps {
  link: string
  label: string
  linkItems: InternalRouteProps[]
}

export const TopbarLinkDropdown = ({
  link,
  label,
  linkItems
}: TopbarLinkDropdownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const classes = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div className={classes.wrapper} onClick={handleClick}>
        <TopbarLinkContainer
          placement={'topbar'}
          link={link}
          label={label}
          disabled={true}
          active={Boolean(anchorEl)}
        />
      </div>

      <Menu
        disableScrollLock={true}
        classes={{
          paper: classes.paper,
          list: classes.list
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {linkItems.map((accountLink, i) => {
          return (
            <MenuItem
              onClick={handleClose}
              key={accountLink.label}
              className={classes.navItem}
              disableTouchRipple
            >
              <TopbarLinkContainer
                label={accountLink.label}
                link={accountLink.path}
                key={accountLink.label}
              />
              {i < linkItems.length - 1 && <Box className={classes.line} />}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
