import { Button } from '@mui/material'
import { useConfirmMatchOrder } from 'app/pages/authorizer/hooks/useConfirmMatchOrder'
import { TableView } from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import React from 'react'
import { MatchedOTCOrder } from 'types/otcOrder'
import { matchedOrders } from '__fixtures__/otcOrders'
import { columns } from './columns'

const Actions = ({ item }) => {
  const [confirmOrder, { isLoading }] = useConfirmMatchOrder()
  return (
    <Button
      color='primary'
      variant='outlined'
      disableElevation
      disabled={isLoading}
      onClick={async () => await confirmOrder(item._id)}
    >
      Confirm
    </Button>
  )
}
export const MatchedOrders = () => {
  return (
    <>
      <TableView<MatchedOTCOrder>
        uri={trading.getMatchedOrders}
        name={tradingQueryKeys.getMatchedOrders}
        columns={columns}
        actions={Actions}
        hasActions
        fakeItems={matchedOrders}
        themeVariant={'primary'}
      />
    </>
  )
}
