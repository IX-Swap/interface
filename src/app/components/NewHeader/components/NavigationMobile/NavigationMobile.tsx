import React from 'react'
import { Grid } from '@mui/material'
import { TopbarLinkContainer } from 'app/components/NewHeader/components/TopbarLinkContainer/TopbarLinkContainer'
import { DropdownContentProps } from 'app/components/NewHeader/components/Dropdown/Dropdown'
import { NavigationDropdownLinkMobile } from 'app/components/NewHeader/components/NavigationDropdownLinkMobile'
import { useStyles } from 'app/components/NewHeader/components/NavigationMobile/NavigationMobile.styles'
// TODO Delete mocked hook after demo
import { useAppNavigationLinks } from 'app/components/NewHeader/hooks/mock/useAppNavigationLinks'
// import { useAppNavigationLinks } from 'ui/UIKit/NewHeader/hooks/useAppNavigationLinks'

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
