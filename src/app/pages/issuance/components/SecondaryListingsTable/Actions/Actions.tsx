/* eslint-disable */
import { Box, IconButton } from '@mui/material'
import useStyles from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions.styles'
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
  const [to, setTo] = useState('')
  const [params, setParams] = useState({})

  useEffect(() => {
    switch (item?.listingType) {
      case 'OTC':
        setTo(paths.editOTCListing)
        item.listingType = 'OTC'
        setParams({
          UserId: item.authorization?.authorizer ?? item.user,
          OTCListingId: item._id
        })
        break
      case 'Exchange':
        item.listingType = 'Exchange'
        setTo(paths.editListing)
        setParams({
          listingId: item._id,
          issuerId: getIdFromObj(user)
        })
        break
      case 'Exchange/OTC':
        item.listingType = 'Exchange/OTC'
        setTo(paths.editListing)
        setParams({
          listingId: item._id,
          issuerId: getIdFromObj(user)
        })
        break
    }
  }, [])

  return (
    <Box display={'flex'} justifyContent={'flex-start'}>
      <IconButton component={AppRouterLinkComponent} to={to} params={params}>
        <EditIcon />
      </IconButton>
      <IconButton
        component={AppRouterLinkComponent}
        to={
          item?.listingType === 'OTC' ? paths.viewOTCListing : paths.viewListing
        }
        params={
          item?.listingType === 'OTC'
            ? {
                UserId: item.authorization?.authorizer ?? item.user,
                OTCListingId: item._id
              }
            : { listingId: item._id }
        }
        className={classes.button}
      >
        <LaunchIcon color='disabled' />
      </IconButton>
    </Box>
  )
}
