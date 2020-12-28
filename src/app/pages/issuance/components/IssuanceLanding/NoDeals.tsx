import React from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { Typography, Button } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'

export const NoDeals = () => {
  const { paths } = useIssuanceRouter()

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
        to={paths.create}
        size='large'
        color='primary'
        variant='contained'
      >
        Create a new dso
      </Button>
    </>
  )
}
