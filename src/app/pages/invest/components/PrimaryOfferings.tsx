import React from 'react'
import { usePromotedDSOs } from 'app/pages/invest/hooks/usePromotedDSOs'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Grid } from '@material-ui/core'
import { OTCMarketCard } from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard'
import useStyles from 'app/pages/invest/components/styles/OTCMarket.style'

export const PrimaryOfferings = () => {
  const { data, status } = usePromotedDSOs()
  const classes = useStyles()

  if (status === 'loading' || data.list.length === undefined) {
    return null
  }

  const promotedDSOs = data.list

  return (
    <Grid container wrap={'wrap'} className={classes.container}>
      {promotedDSOs.map((dso, i) => (
        <Grid item key={dso._id}>
          <OTCMarketCard dso={dso} viewURL={InvestRoute.view} />
        </Grid>
      ))}
    </Grid>
  )
}
