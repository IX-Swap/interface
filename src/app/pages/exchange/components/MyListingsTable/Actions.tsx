import React from 'react'
import { Launch as LaunchIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { OTCMarketRoute as paths } from 'app/pages/exchange/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Listing } from 'types/listing'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import EditIcon from '@mui/icons-material/Edit'

export interface ActionsProps {
  item: Listing
}

export const Actions = ({ item }: ActionsProps) => {
  const { user } = useAuth()

  return (
    <>
      <IconButton
        component={AppRouterLinkComponent}
        to={paths.editListing}
        params={{ listingId: item._id, issuerId: getIdFromObj(user) }}
        size='small'
      >
        <EditIcon color='disabled' />
      </IconButton>
      <IconButton
        component={AppRouterLinkComponent}
        to={paths.viewListing}
        params={{ listingId: item._id }}
        size='small'
      >
        <LaunchIcon color='disabled' />
      </IconButton>
    </>
  )
}
