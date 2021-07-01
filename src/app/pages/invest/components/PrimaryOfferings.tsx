import React from 'react'
import { usePromotedDSOs } from 'app/pages/invest/hooks/usePromotedDSOs'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Grid } from '@material-ui/core'
import { OTCMarketCard } from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard'
import useStyles from 'app/pages/invest/components/styles/OTCMarket.style'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const PrimaryOfferings = () => {
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const primaryOfferingSearch = getFilterValue('primaryOfferingSearch')
  const { data, status } = usePromotedDSOs(search ?? primaryOfferingSearch)
  const classes = useStyles()

  if (status === 'loading' || data.list.length === undefined) {
    return null
  }

  const promotedDSOs = data.list

  return (
    <Grid container wrap={'wrap'} className={classes.container}>
      {promotedDSOs.map((dso, i) => (
        <Grid item key={dso._id}>
          <OTCMarketCard
            type={'Primary'}
            data={dso}
            viewURL={InvestRoute.view}
          />
        </Grid>
      ))}
    </Grid>
  )
}
