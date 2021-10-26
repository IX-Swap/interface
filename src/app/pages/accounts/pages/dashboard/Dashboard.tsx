import React from 'react'
import { TopInfoPanel } from 'app/pages/accounts/pages/dashboard/TopInfoPanel/TopInfoPanel'
import { MarketPortfolio } from 'app/pages/accounts/pages/dashboard/MarketPortfolio/MarketPortfolio'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'

export const Dashboard: React.FC = () => {
  return (
    <Grid container direction={'column'}>
      <Grid item>
        <VSpacer size={'medium'} />
        <TopInfoPanel />
        <VSpacer size={'small'} />
        <VSpacer size={'extraSmall'} />
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <MarketPortfolio
            type={'primary'}
            fund={134000}
            debt={363000}
            equity={103000}
            total={600000}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
