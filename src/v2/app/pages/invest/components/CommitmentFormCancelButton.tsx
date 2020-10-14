import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'

export interface CommitmentFormCancelButtonProps extends ButtonProps {}

export const CommitmentFormCancelButton = (
  props: CommitmentFormCancelButtonProps
) => {
  const { paths, params } = useOfferingsRouter()

  return (
    <AppRouterLink to={paths.view} params={params}>
      <Button {...props} variant='contained' fullWidth disableElevation>
        Cancel
      </Button>
    </AppRouterLink>
  )
}
