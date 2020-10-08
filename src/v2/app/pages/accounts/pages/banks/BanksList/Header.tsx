import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useBanksRouter } from '../router'

export const Header: React.FC = () => {
  const { paths: banksPaths } = useBanksRouter()

  return (
    <Grid item container xs={12} justify='flex-end'>
      {/* {isAccredited && hasApproved && ( */}
      {/*  <Box pr={4} display='flex'> */}
      {/*    <Button variant='contained' color='primary' disableElevation> */}
      {/*      <AppRouterLink to={accountPaths.depositCash}>Deposit</AppRouterLink> */}
      {/*    </Button> */}
      {/*    <Box paddingX={0.5} /> */}
      {/*    <Button variant='contained' color='primary' disableElevation> */}
      {/*      <AppRouterLink to={accountPaths.withdrawCash}> */}
      {/*        Withdraw */}
      {/*      </AppRouterLink> */}
      {/*    </Button> */}
      {/*  </Box> */}
      {/* )} */}

      <Button variant='contained' color='primary' disableElevation>
        <AppRouterLink to={banksPaths.create}>Add Bank Account</AppRouterLink>
      </Button>
    </Grid>
  )
}
