import React from 'react'
import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AdminRoute } from 'app/pages/admin/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

export interface ViewIdentityActionProps {
  userId: string
  createdById: string
  identityType: 'individual' | 'corporate' | 'issuer'
}

export const ViewIdentityAction = ({
  userId,
  createdById,
  identityType
}: ViewIdentityActionProps) => {
  const { user } = useAuth()
  const adminId = getIdFromObj(user)

  if (adminId !== createdById) {
    return null
  }

  const {
    createIndividualIdentity,
    createCorporateIdentity,
    createIssuerIdentity
  } = AdminRoute

  const getViewRoute = () => {
    switch (identityType) {
      case 'individual':
        return createIndividualIdentity
      case 'corporate':
        return createCorporateIdentity
      case 'issuer':
        return createIssuerIdentity
      default:
        return createIndividualIdentity
    }
  }

  return (
    <IconButton
      component={AppRouterLinkComponent}
      size='small'
      to={getViewRoute()}
      params={{ userId: userId }}
    >
      <Launch color='disabled' />
    </IconButton>
  )
}
