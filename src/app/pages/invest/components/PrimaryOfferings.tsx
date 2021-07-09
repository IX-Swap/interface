import React from 'react'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Grid, TablePagination } from '@material-ui/core'
import { OTCMarketCard } from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard'
import useStyles from 'app/pages/invest/components/styles/OTCMarket.style'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { dsoQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { DigitalSecurityOffering } from 'types/dso'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const PrimaryOfferings = () => {
  const classes = useStyles()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const primaryOfferingSearch = getFilterValue('primaryOfferingSearch')

  const {
    items,
    status,
    page,
    setPage,
    setRowsPerPage,
    rowsPerPage,
    total
  } = useTableWithPagination(
    dsoQueryKeys.getPromoted,
    issuanceURL.dso.getAllPromoted,
    { search: search ?? primaryOfferingSearch },
    true,
    5,
    true
  )

  if (status === 'loading' || items.length === undefined) {
    return null
  }

  return (
    <Grid container justify={'flex-end'}>
      <Grid container item wrap={'wrap'} className={classes.container}>
        {(items as DigitalSecurityOffering[]).map((dso, i) => (
          <Grid item key={dso._id}>
            <OTCMarketCard
              type={'Primary'}
              data={dso}
              viewURL={InvestRoute.view}
            />
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
