import React from 'react'
import { Box, Menu, MenuItem } from '@mui/material'
import { InternalRouteProps } from 'types/util'
import { TopbarLinkContainer } from 'ui/UIKit/Header/TopbarLinkContainer/TopbarLinkContainer'
import { useStyles } from './TopbarLinkDropdown.styles'

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
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div className={classes.wrapper} onClick={e => handleClick(e)}>
        <TopbarLinkContainer link={link} label={label} disabled={true} />
      </div>

      <Menu
        classes={{ root: classes.menu, list: classes.list }}
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
