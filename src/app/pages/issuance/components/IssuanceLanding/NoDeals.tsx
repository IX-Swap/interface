import React from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Typography, Button } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export const NoDeals = () => {
  return (
    <>
      <Typography variant='body1' align='center'>
        You have not created any deals. Click the button below to create a new
        deal
      </Typography>
      <VSpacer size='medium' />
      <Button
        fullWidth
        component={AppRouterLinkComponent}
        to={IssuanceRoute.create}
        size='large'
        color='primary'
        variant='contained'
      >
        Create a new dso
      </Button>
    </>
  )
}
