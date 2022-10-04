/* eslint-disable */
import React from 'react'
import { Box, IconButton } from '@mui/material'
import { IssuanceRoute as paths } from 'app/pages/issuance/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Listing } from 'types/listing'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { ReactComponent as EditIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/edit.svg'
import { ReactComponent as LaunchIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/view.svg'
import useStyles from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actios.styles'

export interface ActionsProps {
  item: Listing
}

export const Actions = ({ item }: ActionsProps) => {
  const { user } = useAuth()
  const classes = useStyles()
  const exchange = item?.listingType === 'Exchange' || 'Exchange/OTC'

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const params = exchange
    ? { listingId: item._id, issuerId: getIdFromObj(user) }
    : {
        UserId: item.authorization?.authorizer ?? item.user,
        OTCListingId: item._id
      }

  return (
    <Box display={'flex'} justifyContent={'flex-start'}>
      <IconButton
        component={AppRouterLinkComponent}
        to={exchange ? paths.editListing : paths.editOTCListing}
        params={params}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        component={AppRouterLinkComponent}
        to={paths.viewListing}
        params={{ listingId: item._id }}
        className={classes.button}
      >
        <LaunchIcon color='disabled' />
      </IconButton>
    </Box>
  )
}
