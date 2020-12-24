import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Launch } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useIssuanceRouter } from 'app/pages/issuance/router'

export interface ActionsProps {
  item: DigitalSecurityOffering
}

export const Actions = ({ item }: ActionsProps) => {
  const { paths } = useIssuanceRouter()

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
