import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useDSORouter } from 'app/pages/invest/routers/dsoRouter'
import { useTheme } from '@material-ui/core/styles'

export interface CommitmentFormCancelButtonProps extends ButtonProps {}

export const CommitmentFormCancelButton = (
  props: CommitmentFormCancelButtonProps
) => {
  const { paths, params } = useDSORouter()
  const theme = useTheme()

  return (
    <Button
      {...props}
      variant='contained'
      fullWidth
      disableElevation
      component={AppRouterLinkComponent}
      to={paths.view}
      params={params}
      style={{ color: theme.palette.primary.main }}
    >
      Cancel
    </Button>
  )
}
