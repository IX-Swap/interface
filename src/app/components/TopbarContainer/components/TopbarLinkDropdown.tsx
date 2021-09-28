import React from 'react'
import { Menu } from '@material-ui/core'
import { TopbarLinkContainer } from 'app/components/TopbarContainer/components/TopbarLinkContainer'
import { InternalRouteProps } from 'types/util'
import { TopNavMenuItem } from 'app/components/TopbarContainer/components/TopNavMenuItem'

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div style={{ display: 'flex' }} onClick={e => handleClick(e)}>
        <TopbarLinkContainer link={link} label={label} disabled={true} />
      </div>

      <Menu
        style={{ top: 72, paddingTop: 0, paddingBottom: 0 }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {linkItems.map(accountLink => {
          return (
            <TopNavMenuItem onClick={handleClose} key={accountLink.label}>
              <TopbarLinkContainer
                label={accountLink.label}
                link={accountLink.path}
                key={accountLink.label}
                colorVariant={'menu'}
              />
            </TopNavMenuItem>
          )
        })}
      </Menu>
    </>
  )
}
