import { Grid } from '@mui/material'
import {
  columns,
  compactColumns
} from 'app/pages/invest/components/Trading/Orders/PastOrders/columns'
import { CompactBody } from 'components/TableWithPagination/CompactBody'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { OpenOTCOrder } from 'types/otcOrder'
import { EmptyState } from '../EmptyState'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { LeavePageContextWrapper } from 'app/pages/issuance/context/LeavePageContext'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'

export const PastOTCOrders = () => {
  const { isTablet } = useAppBreakpoints()
  const { getFilterValue } = useQueryFilter()
  const filter = {
    status: getFilterValue('tradingStatus')
  }
  return (
    <LeavePageContextWrapper>
      <ActiveElementContextWrapper>
        <Grid>
          <TableView<OpenOTCOrder>
            size='small'
            name={tradingQueryKeys.pastOrders}
            uri={trading.getMyPastOrders}
            columns={columns}
            noHeader={isTablet}
            filter={
              {
                ...filter
              } as any
            }
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
              ? (args: TableViewRendererProps<OpenOTCOrder>) => (
                  <CompactBody {...args} columns={compactColumns} />
                )
              : undefined}
          </TableView>
        </Grid>
      </ActiveElementContextWrapper>
    </LeavePageContextWrapper>
  )
}
