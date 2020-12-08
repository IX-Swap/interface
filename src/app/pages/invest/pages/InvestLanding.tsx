import React from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { Grid, Button, Typography } from '@material-ui/core'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { PromotedDSOs } from 'app/components/DSO/components/PromotedDSOs'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useInvestRouter } from 'app/pages/invest/routers/router'
import { VSpacer } from 'components/VSpacer'

export const InvestLanding = () => {
  const { user } = useAuth()
  const { paths } = useInvestRouter()

  useSetPageTitle(`Welcome, ${user?.name ?? ''}`)

  return (
    <>
      <Grid container justify='space-between'>
        <Typography variant='h4'>Top Offers</Typography>
        <Button
          component={AppRouterLinkComponent}
          to={paths.commitments}
          color='primary'
          variant='outlined'
          size='large'
          disableElevation
        >
          View my commitments
        </Button>
      </Grid>
      <VSpacer size='small' />
      <PromotedDSOs />
    </>
  )
}
