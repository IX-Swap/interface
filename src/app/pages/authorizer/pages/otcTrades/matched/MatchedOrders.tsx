import { Box, Button } from '@mui/material'
import { ActionsType } from 'app/pages/authorizer/components/Actions'
import { useConfirmMatchOrder } from 'app/pages/authorizer/hooks/useConfirmMatchOrder'
import { TableView } from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { capitalizeFirstLetter } from 'helpers/strings'
import React from 'react'
import { OTCOrder } from 'types/otcOrder'
import { columns } from './columns'

export const Actions: ActionsType<OTCOrder> = ({ item }) => {
  const [confirmOrder, { isLoading }] = useConfirmMatchOrder()
  if (item?.matches?.status === 'MATCH') {
    return (
      <Box display='flex' justifyContent={'flex-start'}>
        <Button
          color='primary'
          variant='outlined'
          data-testid={'matchOrderConfirm'}
          disableElevation
          disabled={isLoading}
          onClick={async () =>
            await confirmOrder({
              orderId: item._id,
              matchedOrderId: item.matches?.order ?? ''
            })
          }
        >
          Confirm
        </Button>
      </Box>
    )
  }
  return (
    <Box textAlign={'left'} data-testid={'matchOrderStatus'}>
      {capitalizeFirstLetter(item?.matches?.status ?? '')}
    </Box>
  )
}
export const MatchedOrders = () => {
  return (
    <>
      <TableView<OTCOrder>
        uri={trading.getMatchedOrders}
        name={tradingQueryKeys.getMatchedOrders}
        columns={columns}
        actions={Actions}
        hasActions
        themeVariant={'primary'}
      />
    </>
  )
}
