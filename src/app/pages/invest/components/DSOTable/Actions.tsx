import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Launch } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { useOfferingsRouter } from 'app/pages/invest/routers/offeringsRouter'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export interface ActionsProps {
  item: DigitalSecurityOffering
}

export const Actions = ({ item }: ActionsProps) => {
  const { paths } = useOfferingsRouter()

  return (
    <IconButton
      component={AppRouterLinkComponent}
      size='small'
      data-testid='view-button'
      to={paths.view}
      params={{ issuerId: item.user, dsoId: item._id }}
    >
      <Launch color='disabled' />
    </IconButton>
  )
}
