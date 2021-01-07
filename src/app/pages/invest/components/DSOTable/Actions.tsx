import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Launch } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { DSORoute } from 'app/pages/invest/router/config'

export interface ActionsProps {
  item: DigitalSecurityOffering
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <IconButton
      component={AppRouterLinkComponent}
      size='small'
      data-testid='view-button'
      to={DSORoute.view}
      params={{ issuerId: item.user, dsoId: item._id }}
    >
      <Launch color='disabled' />
    </IconButton>
  )
}
