import { Box, Button } from '@mui/material'
import { ActionsType } from 'app/pages/authorizer/components/Actions'
import { useConfirmMatchOrder } from 'app/pages/authorizer/hooks/useConfirmMatchOrder'
import { useRejectMatchOrder } from 'app/pages/authorizer/hooks/useRejectMatchOrder'
import { TableView } from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { capitalizeFirstLetter } from 'helpers/strings'
import React from 'react'
import { OTCOrder } from 'types/otcOrder'
import { columns } from './columns'
import { styled } from '@mui/material/styles'

export const Actions: ActionsType<OTCOrder> = ({ item }) => {
  const [confirmOrder, { isLoading: isConfirming }] = useConfirmMatchOrder()
  const [rejectOrder, { isLoading: isRejecting }] = useRejectMatchOrder()
  const isLoading = isConfirming || isRejecting

  if (item?.matches?.status === 'MATCH' && item.status !== 'REJECTED') {
    return (
      <Box display='flex' justifyContent={'flex-start'} columnGap={1}>
        <ConfirmButton
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
        </ConfirmButton>
        <RejectButton
          variant='outlined'
          data-testid={'matchOrderConfirm'}
          disableElevation
          disabled={isLoading}
          onClick={async () =>
            await rejectOrder({
              orderId: item._id,
              matchedOrderId: item.matches?.order ?? ''
            })
          }
        >
          Reject
        </RejectButton>
      </Box>
    )
  }

  return (
    <Box textAlign={'left'} data-testid={'matchOrderStatus'}>
      {capitalizeFirstLetter(
        item.status === 'REJECTED' ? item.status : item?.matches?.status ?? ''
      )}
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

const ConfirmButton = styled(Button)(() => ({
  fontSize: '13px',
  padding: '5px 12px'
}))

const RejectButton = styled(Button)(() => ({
  fontSize: '13px',
  padding: '5px 12px',
  borderColor: '#ef5350',
  color: '#d32f2f',

  '&:hover': {
    backgroundColor: '#ef5350'
  }
}))