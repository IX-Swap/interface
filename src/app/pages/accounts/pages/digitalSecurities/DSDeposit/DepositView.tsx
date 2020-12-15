import React from 'react'
import { Grid } from '@material-ui/core'
import { AssetInfo } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo'
import { AssetView } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetView'
import { VSpacer } from 'components/VSpacer'

export const DepositView: React.FC = () => {
  return (
    <Grid container justify='center'>
      <Grid container item direction='column' xs={5}>
        <VSpacer size='medium' />
        <AssetInfo />
        <AssetView />
      </Grid>
    </Grid>
  )
}
