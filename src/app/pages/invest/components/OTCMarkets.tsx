import React from 'react'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Grid } from '@mui/material'
import { OTCMarketCard } from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard'
import useStyles from 'app/pages/invest/components/styles/OTCMarket.style'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { OTCUrl } from 'config/apiURL'
import { otcQueryKeys } from 'config/queryKeys'
import { DigitalSecurityOffering } from 'types/dso'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

// TODO: When we will have multiple OTC pairs adjust this
import { useFeaturedPair } from '../hooks/useFeaturedPair'

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
  if (isLoading) {
    return null
  }
  const activeDSOs = items.filter(
    item => (item as any)?.dso === data?.listing?.dso?._id
  )
  return (
    <Grid container justifyContent={'flex-end'}>
      <Grid container item wrap={'wrap'} className={classes.container}>
        {(activeDSOs as DigitalSecurityOffering[]).map((otc, i) => (
          <Grid item key={otc._id}>
            <OTCMarketCard
              type={'OTC'}
              data={otc}
              viewURL={InvestRoute.trading}
            />
          </Grid>
        ))}
      </Grid>
      {/* <Grid item style={{ marginTop: 14 }}>
        {total > 0 && (
          <TablePagination
            component='div'
            style={{ width: '100%', borderBottom: 'none' }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onRowsPerPageChange={evt => {
              setPage(0)
              setRowsPerPage(parseInt(evt.target.value))
            }}
            onPageChange={(evt, newPage: number) => {
              setPage(newPage)
            }}
          />
        )}
      </Grid> */}
    </Grid>
  )
}
