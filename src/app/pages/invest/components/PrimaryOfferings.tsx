import React from 'react'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Grid, TablePagination } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/styles/OTCMarket.style'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { dsoQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'
import { DigitalSecurityOffering } from 'types/dso'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { DSOCard } from 'app/pages/invest/components/DSOCard/DSOCard'

export const PrimaryOfferings = () => {
  const classes = useStyles()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search')
  const primaryOfferingSearch = getFilterValue('primaryOfferingSearch')

  const { items, status, page, setPage, setRowsPerPage, rowsPerPage, total } =
    useTableWithPagination({
      queryKey: dsoQueryKeys.getPromoted,
      uri: issuanceURL.dso.getAllPromoted,
      defaultFilter: { search: search ?? primaryOfferingSearch },
      queryEnabled: true,
      defaultRowsPerPage: 5,
      disabledUseEffect: true
    })

  if (status === 'loading' || items.length === undefined) {
    return null
  }

  return (
    <Grid container justifyContent={'flex-end'}>
      <Grid container item wrap={'wrap'} className={classes.container}>
        {(items as DigitalSecurityOffering[]).map((dso, i) => (
          <Grid item key={dso._id}>
            <DSOCard type={'Primary'} data={dso} viewURL={InvestRoute.view} />
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
            labelRowsPerPage={'Items per page'}
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
      </Grid>
    </Grid>
  )
}
