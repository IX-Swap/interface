import { Grid } from '@material-ui/core'
import { WalletAddress } from 'app/components/WalletAddress'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'

export const Address = () => {}

export const BasicOverview = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Network' value='Public Ethereum Network' />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Capital Structure' value='Debt' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Launch Date' value='10/10/2020' />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Completion Date' value='09/12/2021' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Decimal' value='10' />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue
          label='Token Address'
          value={
            <WalletAddress
              long
              address='0xf26701e65ec92ac5aec1b4e19c8c41be3a642b96'
            />
          }
        />
      </Grid>
    </Grid>
  )
}
