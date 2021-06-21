import React from 'react'
import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AdminRoute } from 'app/pages/admin/router/config'

export interface ViewIdentityActionProps {
  userId: string
  identityId: string
  identityType: 'individual' | 'corporate' | 'issuer'
}

export const ViewIdentityAction = ({
  userId,
  identityId,
  identityType
}: ViewIdentityActionProps) => {
  const { viewIndividualIdentity, viewCorporateIdentity } = AdminRoute

  const getViewRoute = () => {
    switch (identityType) {
      case 'individual':
        return viewIndividualIdentity
      case 'corporate':
        return viewCorporateIdentity
      case 'issuer':
        return viewCorporateIdentity
      default:
        return '/'
    }
  }

  return (
    <IconButton
      component={AppRouterLinkComponent}
      size='small'
      to={getViewRoute()}
      params={{ userId: userId, identityId: identityId }}
    >
      <Launch color='disabled' />
    </IconButton>
  )
}
