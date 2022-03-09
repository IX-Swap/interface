import React from 'react'
import { Grid } from '@mui/material'
import { TopbarLinkContainer } from 'ui/UIKit/Header/components/TopbarLinkContainer/TopbarLinkContainer'
import { DropdownContentProps } from 'ui/UIKit/Header/components/Dropdown/Dropdown'
import { NavigationDropdownLinkMobile } from 'ui/UIKit/Header/components/NavigationDropdownLinkMobile'
import { useStyles } from './NavigationMobile.styles'
// TODO Delete mocked hook after demo
import { useAppNavigationLinks } from 'ui/UIKit/Header/hooks/mock/useAppNavigationLinks'
// import { useAppNavigationLinks } from 'ui/UIKit/Header/hooks/useAppNavigationLinks'

export const NavigationMobile = (props: DropdownContentProps) => {
  const classes = useStyles()
  const { links, dropdownLinksItems, isDropdownLink } = useAppNavigationLinks()

  return (
    <Grid className={classes.wrapper} flexDirection={'column'}>
      {links.map(link => {
        if (isDropdownLink(link.label)) {
          const dropdownLinks = dropdownLinksItems(link.label).map(item => {
            return {
              ...item,
              onClick: () => props.injectedProps.close()
            }
          })

          return (
            <NavigationDropdownLinkMobile
              {...link}
              dropdownLinksItems={dropdownLinks}
            />
          )
        }
        return (
          <TopbarLinkContainer
            {...link}
            key={link.label}
            onClick={() => props.injectedProps.close()}
          />
        )
      })}
    </Grid>
  )
}
