import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useParams } from 'react-router-dom'
import { InvestRoute } from 'app/pages/invest/router/config'

export interface CommitmentFormCancelButtonProps extends ButtonProps {}

export const CommitmentFormCancelButton = (
  props: CommitmentFormCancelButtonProps
) => {
  const params = useParams<{ dsoId: string; issuerId: string }>()

  return (
    <Button
      {...props}
      variant='outlined'
      fullWidth
      color='primary'
      disableElevation
      component={AppRouterLinkComponent}
      to={InvestRoute.view}
      params={params}
      replace
    >
      Cancel
    </Button>
  )
}
