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

const Actions: ActionsType<OTCOrder> = ({ item }) => {
  const [confirmOrder, { isLoading }] = useConfirmMatchOrder()
  if (item?.matches?.status === 'MATCH') {
    return (
      <Button
        color='primary'
        variant='outlined'
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
    )
  }
  return (
    <Box textAlign={'left'}>
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
