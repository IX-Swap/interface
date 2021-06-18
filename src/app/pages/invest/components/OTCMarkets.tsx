import React from 'react'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Grid } from '@material-ui/core'
import { OTCMarketCard } from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard'
import useStyles from 'app/pages/invest/components/styles/OTCMarket.style'
import { useOTCMarketsList } from 'app/pages/invest/hooks/useOTCMarketsList'

export const OTCMarket = () => {
  const { data, status } = useOTCMarketsList()
  const classes = useStyles()

  if (status === 'loading' || data.list.length === undefined) {
    return null
  }

  const approvedListingsList = data.list

  return (
    <Grid container wrap={'wrap'} className={classes.container}>
      {approvedListingsList.map((otc, i) => (
        <Grid item key={otc._id}>
          <OTCMarketCard type={'OTC'} data={otc} viewURL={InvestRoute.view} />
        </Grid>
      ))}
    </Grid>
  )
}
