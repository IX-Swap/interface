import React from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@mui/material'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { useParams } from 'react-router-dom'

export const DSOBackButton = () => {
  const params = useParams()

  return (
    <Button
      component={AppRouterLinkComponent}
      to={IssuanceRoute.list} // TODO: add logic for the create DSO screen
      params={params}
    >
      Cancel
    </Button>
  )
}
