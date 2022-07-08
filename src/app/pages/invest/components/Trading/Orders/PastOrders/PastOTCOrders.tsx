import { Grid } from '@mui/material'
import {
  columns,
  compactColumns
} from 'app/pages/invest/components/Trading/Orders/PastOrders/columns'
import { CompactBody } from 'components/TableWithPagination/CompactBody'
import {
  TableView,
  TableViewRendererProps
} from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { OTCOrder } from 'types/otcOrder'
import { EmptyState } from '../EmptyState'

export const PastOTCOrders = () => {
  const { isTablet } = useAppBreakpoints()
  return (
    <>
      <Grid>
        <TableView<OTCOrder>
          size='small'
          name={tradingQueryKeys.pastOrders}
          uri={trading.getMyPastOrders}
          columns={columns}
          themeVariant={'primary'}
          noHeader={isTablet}
          noDataComponent={
            <EmptyState
              title='No past orders'
              subtitle='You haven’t made any orders on this wallet'
              isRow={false}
            />
          }
          paperProps={
            isTablet
              ? {
                  variant: 'elevation',
                  elevation: 0
                }
              : undefined
          }
        >
          {isTablet
            ? (args: TableViewRendererProps<OTCOrder>) => (
                <CompactBody {...args} columns={compactColumns} />
              )
            : undefined}
        </TableView>
      </Grid>
    </>
  )
}
