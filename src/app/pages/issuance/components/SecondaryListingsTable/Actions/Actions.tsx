/* eslint-disable */
import { Box, IconButton } from '@mui/material'
import useStyles from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actios.styles'
import { ReactComponent as EditIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/edit.svg'
import { ReactComponent as LaunchIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/view.svg'
import { IssuanceRoute as paths } from 'app/pages/issuance/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import React, { useEffect, useState } from 'react'
import { Listing } from 'types/listing'

export interface ActionsProps {
  item: Listing
}

export const Actions = ({ item }: ActionsProps) => {
  const { user } = useAuth()
  const classes = useStyles()
  const [listingType, setListingType] = useState(item?.listingType)

  useEffect(() => {
    if (item?.listingType === 'OTC') setListingType('OTC')
    if (item?.listingType === 'Exchange') setListingType('Exchange')
    if (item?.listingType === 'Exchange/OTC') setListingType('Exchange')
  }, [])

  return (
    <Box display={'flex'} justifyContent={'flex-start'}>
      <IconButton
        component={AppRouterLinkComponent}
        to={
          listingType?.includes('Exchange')
            ? paths.editListing
            : paths.editOTCListing
        }
        params={
          listingType?.includes('Exchange')
            ? { listingId: item._id, issuerId: getIdFromObj(user) }
            : {
                UserId: item.authorization?.authorizer ?? item.user,
                OTCListingId: item._id
              }
        }
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
