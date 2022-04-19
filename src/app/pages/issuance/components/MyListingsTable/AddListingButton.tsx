import React from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@mui/material'
import { IssuanceRoute as paths } from 'app/pages/issuance/router/config'

export const AddListingButton = () => {
  return (
    <Button
      component={AppRouterLinkComponent}
      to={paths.createListing}
      size='small'
      color='primary'
      variant='outlined'
    >
      Create a new listing
    </Button>
  )
}
