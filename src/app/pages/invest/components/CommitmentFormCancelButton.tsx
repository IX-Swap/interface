import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useParams } from 'react-router-dom'
import { DSORoute } from 'app/pages/invest/router/config'

export interface CommitmentFormCancelButtonProps extends ButtonProps {}

export const CommitmentFormCancelButton = (
  props: CommitmentFormCancelButtonProps
) => {
  const params = useParams<{ dsoId: string; issuerId: string }>()

  return (
    <Button
      {...props}
      variant='contained'
      fullWidth
      disableElevation
      component={AppRouterLinkComponent}
      to={DSORoute.view}
      params={params}
      replace
    >
      Cancel
    </Button>
  )
}
