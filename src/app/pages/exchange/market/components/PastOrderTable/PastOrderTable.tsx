import React from 'react'
import { Order } from 'types/order'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { VSpacer } from 'components/VSpacer'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/exchange/market/components/PastOrderTable/columns'
import { usePastOrderFilter } from 'app/pages/exchange/market/hooks/usePastOrderFilter'
import { PastOrderFilter } from 'app/pages/exchange/market/components/PastOrderFilter/PastOrderFilter'
import { exchangeMarketQueryKeys } from 'config/queryKeys'
import { exchangeMarket } from 'config/apiURL'

export interface PostOrderTableProps {
  pairId: string
}

export const PastOrderTable = (props: PostOrderTableProps) => {
  const { pairId } = props
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { filter } = usePastOrderFilter(pairId)

  return (
    <>
      <PastOrderFilter />
      <VSpacer size={'small'} />
      <TableView<Order>
        size='small'
        name={exchangeMarketQueryKeys.getOrdersList(pairId)}
        uri={exchangeMarket.getOrdersList(userId)}
        columns={columns}
        filter={filter}
      />
    </>
  )
}
