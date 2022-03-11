import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Launch } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'

export interface ActionsProps {
  item: DigitalSecurityOffering
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <IconButton
      component={AppRouterLinkComponent}
      size='small'
      data-testid='view-button'
      to={InvestRoute.view}
      params={{ issuerId: item.user, dsoId: item._id }}
    >
      <Launch color='disabled' />
    </IconButton>
  )
}
