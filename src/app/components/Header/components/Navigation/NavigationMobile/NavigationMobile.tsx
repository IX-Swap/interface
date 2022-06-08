import React from 'react'
import { Grid } from '@mui/material'
import { TopbarLinkContainer } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer'
import { DropdownContentProps } from 'app/components/Header/components/Dropdown/Dropdown'
import { NavigationDropdownLinkMobile } from 'app/components/Header/components/Navigation/NavigationDropdownLinkMobile'
import { useStyles } from 'app/components/Header/components/Navigation/NavigationMobile/NavigationMobile.styles'
import { useAppNavigation } from 'app/components/Header/hooks/useAppNavigation'

export const NavigationMobile = (props: DropdownContentProps) => {
  const classes = useStyles()
  const { links, dropdownLinksItems, isDropdownLink } = useAppNavigation()

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
              key={link.label}
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
