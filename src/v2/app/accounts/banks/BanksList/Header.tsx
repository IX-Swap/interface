import React from 'react'
import { useIsAccredited } from 'v2/helpers/acl'
import { Grid, Box, Button } from '@material-ui/core'
import { useBanksRouter } from 'v2/app/accounts/banks/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export const Header: React.FC = () => {
  const { routes } = useBanksRouter()
  const isAccredited = useIsAccredited()
  const hasApproved = true

  return (
    <Grid item container xs={12} justify='flex-end'>
      {isAccredited && hasApproved && (
        <Box pr={4} display='flex'>
          <Button variant='contained' color='primary' disableElevation>
            <AppRouterLink to={routes.deposit}>Deposit</AppRouterLink>
          </Button>
          <Box paddingX={0.5} />
          <Button variant='contained' color='primary' disableElevation>
            <AppRouterLink to={routes.withdraw}>Withdraw</AppRouterLink>
          </Button>
        </Box>
      )}

      <Button variant='contained' color='primary' disableElevation>
        <AppRouterLink to={routes.create}>Add Bank Account</AppRouterLink>
      </Button>
    </Grid>
  )
}
