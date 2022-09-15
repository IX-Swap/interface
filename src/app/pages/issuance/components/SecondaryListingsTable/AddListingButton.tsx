import React from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@mui/material'
import { IssuanceRoute as paths } from 'app/pages/issuance/router/config'

export const AddListingButton = () => {
  return (
    <Button
      component={AppRouterLinkComponent}
      to={paths.createListing}
      color='primary'
      variant='contained'
      sx={{ height: 50 }}
    >
      Create a New Listing
    </Button>
  )
}
