import React from 'react'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Grid, TablePagination } from '@material-ui/core'
import { OTCMarketCard } from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard'
import useStyles from 'app/pages/invest/components/styles/OTCMarket.style'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { OTCUrl } from 'config/apiURL'
import { otcQueryKeys } from 'config/queryKeys'
import { DigitalSecurityOffering } from 'types/dso'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const OTCMarket = () => {
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const otcMarketSearch = getFilterValue('otcMarketSearch')
  const {
    items,
    status,
    page,
    setPage,
    setRowsPerPage,
    rowsPerPage,
    total
  } = useTableWithPagination(
    otcQueryKeys.getApprovedListingsList,
    OTCUrl.getApprovedListingsList,
    { search: search ?? otcMarketSearch },
    true,
    5,
    true
  )
  const classes = useStyles()

  if (status === 'loading' || items.length === undefined) {
    return null
  }

  return (
    <Grid container justify={'flex-end'}>
      <Grid container item wrap={'wrap'} className={classes.container}>
        {(items as DigitalSecurityOffering[]).map((otc, i) => (
          <Grid item key={otc._id}>
            <OTCMarketCard type={'OTC'} data={otc} viewURL={InvestRoute.view} />
          </Grid>
        ))}
      </Grid>
      <Grid item style={{ marginTop: 14 }}>
        {total > 0 && (
          <TablePagination
            component='div'
            style={{ width: '100%', borderBottom: 'none' }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangeRowsPerPage={evt => {
              setPage(0)
              setRowsPerPage(parseInt(evt.target.value))
            }}
            onChangePage={(evt, newPage: number) => {
              setPage(newPage)
            }}
          />
        )}
      </Grid>
    </Grid>
  )
}
