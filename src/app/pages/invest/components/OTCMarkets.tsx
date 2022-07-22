import React from 'react'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Grid, Typography } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/styles/OTCMarket.style'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { OTCUrl } from 'config/apiURL'
import { otcQueryKeys } from 'config/queryKeys'
import { DigitalSecurityOffering } from 'types/dso'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
// TODO: When we will have multiple OTC pairs adjust this
import { useFeaturedPair } from 'app/pages/invest/hooks/useFeaturedPair'
import { DSOCard } from 'app/pages/invest/components/DSOCard/DSOCard'

export const OTCMarket = () => {
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const otcMarketSearch = getFilterValue('otcMarketSearch')
  const { items, status } = useTableWithPagination({
    queryKey: otcQueryKeys.getApprovedListingsList,
    uri: OTCUrl.getApprovedListingsList,
    defaultFilter: { search: search ?? otcMarketSearch },
    queryEnabled: true,
    defaultRowsPerPage: 5,
    disabledUseEffect: true
  })
  const { data, isLoading } = useFeaturedPair()

  const classes = useStyles()

  if (status === 'loading' || items.length === undefined) {
    return null
  }

  const activeDSOs = items.filter(
    item => (item as any)?.dso === data?.listing?.dso?._id
  )
  if (isLoading || activeDSOs.length === 0) {
    return null
  }
  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Typography variant='h4'>OTC Market</Typography>
      </Grid>
      <Grid item>
        <Grid container justifyContent={'flex-end'}>
          <Grid container item wrap={'wrap'} className={classes.container}>
            {(activeDSOs as DigitalSecurityOffering[]).map((otc, i) => (
              <Grid item key={otc._id}>
                <DSOCard
                  type={'OTC'}
                  data={otc}
                  viewURL={InvestRoute.trading}
                />
              </Grid>
            ))}
          </Grid>
          {/* Put table pagination here when we will have multiple featured pairs. Take
      it from Primary Offerings, it's identical */}
        </Grid>
      </Grid>
    </Grid>
  )
}
