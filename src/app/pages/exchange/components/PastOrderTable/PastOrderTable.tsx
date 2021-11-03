import React from 'react'
import { Order } from 'types/order'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { VSpacer } from 'components/VSpacer'
import {
  TableView,
  TableViewRendererProps
} from 'components/TableWithPagination/TableView'
import {
  columns,
  pastOrderCompactColumns
} from 'app/pages/exchange/components/PastOrderTable/columns'
import { usePastOrderFilter } from 'app/pages/exchange/hooks/usePastOrderFilter'
import { PastOrderFilter } from 'app/pages/exchange/components/PastOrderFilter/PastOrderFilter'
import { exchangeMarketQueryKeys } from 'config/queryKeys'
import { exchangeMarket } from 'config/apiURL'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Grid, Hidden } from '@material-ui/core'
import { CompactBody } from 'components/TableWithPagination/CompactBody'
import { CompactRowProps } from 'components/TableWithPagination/CompactRow'
import { OrderDisplay } from 'app/pages/exchange/components/OpenOrders/OrderDisplay'

export interface PostOrderTableProps {
  pairId: string
}

export const PastOrderTable = (props: PostOrderTableProps) => {
  const { pairId } = props
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { filter } = usePastOrderFilter(pairId)
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <>
      <Hidden mdDown>
        <PastOrderFilter />
        <VSpacer size={'small'} />
      </Hidden>
      <Grid>
        <TableView<Order>
          size='small'
          name={exchangeMarketQueryKeys.getOrdersList(userId, pairId)}
          uri={exchangeMarket.getOrdersList(userId)}
          columns={columns}
          filter={{ ...filter, orderType: 'PAST' } as any}
          themeVariant={isMiniLaptop ? 'no-header' : 'primary'}
          paperProps={
            isMiniLaptop
              ? {
                  variant: 'elevation',
                  elevation: 0
                }
              : undefined
          }
        >
          {isMiniLaptop
            ? (props: TableViewRendererProps<Order>) => (
                <CompactBody
                  {...props}
                  columns={pastOrderCompactColumns}
                  renderRow={(props: CompactRowProps<Order>) => (
                    <OrderDisplay {...props} />
                  )}
                />
              )
            : undefined}
        </TableView>
      </Grid>
    </>
  )
}
