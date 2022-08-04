import { Button, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { AccountsRoute } from 'app/pages/accounts/router/config'

export const NoBalance = () => {
  return (
    <Card
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 2
      }}
    >
      <Grid container spacing={2}>
        <Grid
          container
          item
          xs={12}
          spacing={1}
          flexWrap='nowrap'
          alignItems='center'
        >
          <Grid item>
            <MonetizationOnOutlinedIcon sx={{ fill: '#778194' }} />
          </Grid>
          <Grid item>
            <Typography variant='subtitle2'>
              You don't have enough money
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1' color='text.secondary'>
            Insufficient balance, please top-up your account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' href={AccountsRoute.deposit} fullWidth>
            Top-up my account
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}
