import React from 'react'
import { Grid } from '@mui/material'
// import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
// import { custodyColumns } from 'app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { columns } from 'app/pages/accounts/pages/security-tokens/DSList/columns'
// import { TableView } from 'components/TableWithPagination/TableView'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { BaseFilters } from 'app/components/BaseFilters/BaseFilters'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { accountsURL } from 'config/apiURL'
import { ExportButton } from 'ui/ExportButton/ExportButton'

export const CustodyList = ({
  hasTopBorder = true
}: {
  hasTopBorder: boolean
}) => {
  //   const { data, isLoading } = useGetCustody()
  const { getFilterValue } = useQueryFilter()
  const filter = {
    search: getFilterValue('search')
  }
  const exportButtonId = 'exportCurrentHoldings'

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <BaseFilters hideDateFilter hasTopBorder={hasTopBorder}>
          <Grid item xs>
            <ExportButton
              fullWidth
              onClick={() => {
                document.getElementById(exportButtonId)?.click()
              }}
            />
          </Grid>
        </BaseFilters>
      </Grid>
      <Grid item>
        <TableView
          // fakeItems={data}
          // fakeLoading={isLoading}
          uri={accountsURL.ledger.getTokenHoldings}
          name={'currentTokenHoldings'}
          columns={columns}
          // queryEnabled={false}
          paperProps={{
            style: {
              borderTop: 'none'
            }
          }}
          filter={filter}
          exportFileName='Current Holdings'
          exportButtonId={exportButtonId}
        />
      </Grid>
    </Grid>
  )
}
