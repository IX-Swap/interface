import React from 'react'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'

export const DSOFormBackButton = () => {
  const params = useParams()

  return (
    <Button
      component={AppRouterLinkComponent}
      variant='contained'
      disableElevation
      to={IssuanceRoute.list} // TODO: add logic for the create DSO screen
      params={params}
    >
      Cancel
    </Button>
  )
}
