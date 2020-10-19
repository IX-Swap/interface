import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'

export interface CommitmentFormCancelButtonProps extends ButtonProps {}

export const CommitmentFormCancelButton = (
  props: CommitmentFormCancelButtonProps
) => {
  const { paths, params } = useOfferingsRouter()

  return (
    <Button
      {...props}
      variant='contained'
      fullWidth
      disableElevation
      component={AppRouterLinkComponent}
      to={paths.view}
      params={params}
    >
      Cancel
    </Button>
  )
}
