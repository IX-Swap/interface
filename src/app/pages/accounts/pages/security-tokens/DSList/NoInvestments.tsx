import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import AddInvestmentImage from 'assets/add-investment.png'
import { InvestRoute } from 'app/pages/invest/router/config'

export const NoInvestments = () => {
  return (
    <Grid container flexDirection={'column'} alignItems='center' py={8}>
      <Grid item xs>
        <img
          src={AddInvestmentImage}
          alt={'Add Investment'}
          width='175.79'
          height='199'
        />
      </Grid>
      <Grid item xs container flexDirection={'column'} spacing={3} pt={5}>
        <Grid item xs>
          <Typography variant='h5' align='center'>
            Add Investment
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='body1' textAlign={'center'}>
            You have not made any investments yet.
          </Typography>
        </Grid>
        <Grid
          item
          xs
          display={'flex'}
          gap={1}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button
            component={AppRouterLinkComponent}
            to={InvestRoute.primaryOfferings}
            size='large'
            color='primary'
            variant='contained'
            disableElevation
            sx={{ paddingX: { md: '120px !important' } }}
          >
            Invest in STO
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
