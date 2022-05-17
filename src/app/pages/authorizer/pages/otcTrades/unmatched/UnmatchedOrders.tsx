import { TableView } from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import React from 'react'
import { OrderType, UnmatchedOTCOrder } from 'types/otcOrder'
import { unmatchedBuyOrders, unmatchedSellOrders } from '__fixtures__/otcOrders'
import { getColumns } from './columns'

export interface UnmatchedOrdersProps {
  side: OrderType
}
export const UnmatchedOrders = ({ side }: UnmatchedOrdersProps) => {
  return (
    <>
      <TableView<UnmatchedOTCOrder>
        uri={trading.getUnmatchedOrders(side)}
        name={tradingQueryKeys.getUnmatchedOrders(side)}
        columns={getColumns(side)}
        hasActions={false}
        fakeItems={side === 'SELL' ? unmatchedSellOrders : unmatchedBuyOrders}
        themeVariant={side === 'SELL' ? 'error' : 'success'}
      />
    </>
  )
}
