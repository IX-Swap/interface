import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useParams } from 'react-router-dom'
import { InvestRoute } from 'app/pages/invest/router/config'
import { useTheme } from '@material-ui/core/styles'

export interface CommitmentFormCancelButtonProps extends ButtonProps {}

export const CommitmentFormCancelButton = (
  props: CommitmentFormCancelButtonProps
) => {
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const theme = useTheme()

  return (
    <Button
      {...props}
      variant='contained'
      fullWidth
      disableElevation
      component={AppRouterLinkComponent}
      to={InvestRoute.view}
      params={params}
      replace
      style={{ color: theme.palette.primary.main }}
    >
      Cancel
    </Button>
  )
}
