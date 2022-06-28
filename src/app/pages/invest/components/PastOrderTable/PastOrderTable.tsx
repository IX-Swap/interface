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
} from 'app/pages/invest/components/PastOrderTable/columns'
import { usePastOrderFilter } from 'app/pages/invest/hooks/usePastOrderFilter'
import { PastOrderFilter } from 'app/pages/invest/components/PastOrderFilter/PastOrderFilter'
import { exchangeMarketQueryKeys } from 'config/queryKeys'
import { exchangeMarket } from 'config/apiURL'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Grid, Hidden } from '@mui/material'
import { CompactBody } from 'components/TableWithPagination/CompactBody'

export interface PostOrderTableProps {
  pairId?: string
}

export const PastOrderTable = (props: PostOrderTableProps) => {
  const { pairId } = props
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { filter } = usePastOrderFilter(pairId)
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <>
      <Hidden lgDown>
        <PastOrderFilter pairId={pairId} />
        <VSpacer size={'small'} />
      </Hidden>
      <Grid>
        <TableView<Order>
          size='small'
          name={exchangeMarketQueryKeys.getOrdersList(userId, pairId)}
          uri={exchangeMarket.getOrdersList(userId)}
          columns={columns}
          filter={{ ...filter, orderType: 'PAST' } as any}
          themeVariant={'primary'}
          noHeader={isMiniLaptop}
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
                <CompactBody {...props} columns={pastOrderCompactColumns} />
              )
            : undefined}
        </TableView>
      </Grid>
    </>
  )
}
