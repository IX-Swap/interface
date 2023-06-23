import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { ReactComponent as LaunchIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/view.svg'
import { IconButton } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import useStyles from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions.styles'
import { useAuth } from 'hooks/auth/useAuth'
export interface ActionsProps {
  item: DigitalSecurityOffering
}

export const Actions = ({ item }: ActionsProps) => {
  const classes = useStyles()
  const { user } = useAuth()
  return (
    <IconButton
      component={AppRouterLinkComponent}
      size='medium'
      data-testid='view-button'
      to={IssuanceRoute.view}
      params={{ issuerId: item.user, dsoId: item._id }}
      className={classes.button}
    >
      {user?.roles.split(',').map(role => {
        if (role === 'admin') {
          return <LaunchIcon color='disabled' />
        }
      })}
    </IconButton>
  )
}