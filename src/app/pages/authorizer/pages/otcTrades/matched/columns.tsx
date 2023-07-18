import { formatDateToMMDDYY } from 'helpers/dates'
import React from 'react'
import {
  formatMoney,
  //   formatRoundedAmount,
  getFilledRoundedPercentage,
  getOrderCurrency,
  renderTotal
} from 'helpers/numbers'
import { OTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'
import { renderIdentityLink } from '../OrderTableIdentityLink'
import { Status } from 'ui/Status/Status'
import { Actions } from 'app/pages/authorizer/components/Actions'
import { Box } from '@mui/material'
import { get } from 'lodash'

const renderColumnWithApproval = (row: object, status: string) => {
  const statusField = get(row, 'status')
  const matchedStatusField = get(row?.matches, 'status')

  return (
    <Box display={'flex'} justifyContent={''}>
      <Status
        matchedStatus={matchedStatusField}
        label={status}
        // type={status.toLowerCase()}
        type={`${status}-${matchedStatusField}`}
      />
      {statusField !== 'REJECTED' && matchedStatusField === 'MATCH' ? (
        <Actions
          item={row}
          cacheQueryKey={''}
          featureCategory='otc/matched'
          statusFieldName={'status'}
          matchedStatusField={matchedStatusField}
        />
      ) : (
        ''
      )}
    </Box>
  )
}

export const columns: Array<TableColumn<OTCOrder>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'pair.name',
    label: 'Pair'
  },
  {
    key: 'user',
    label: 'Buyer',
    render: (_, item) => renderIdentityLink(item, 'BUY')
  },
  {
    key: 'ethAddress',
    label: 'Filled Buy',
    render: (_, row) =>
      getFilledRoundedPercentage({
        amount: row.amount,
        availableAmount: row.availableAmount
      })
  },
  {
    key: 'identity._id',
    label: 'Seller',
    render: (_, item) => renderIdentityLink(item, 'SELL')
  },
  {
    key: '_id',
    label: 'Filled Sell',
    render: (_, row) =>
      getFilledRoundedPercentage({
        amount: row.matches?.matchedOrder?.amount ?? 1,
        availableAmount: row.matches?.matchedOrder?.availableAmount
      })
  },
  {
    key: 'price',
    label: 'Price',
    render: (_, row) =>
      formatMoney(row?.matches?.matchedPrice ?? 0, getOrderCurrency(row), false)
  },
  {
    key: 'availableAmount',
    label: 'Amount',
    render: (_, row) => row?.matches?.matchedAmount ?? 0,
    // render: (_, row) => formatRoundedAmount(row?.matches?.matchedAmount ?? 0),
    align: 'center'
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({
        amount: row?.matches?.matchedAmount ?? 0,
        price: row?.matches?.matchedPrice ?? 0,
        row
      })
  },
  {
    key: 'status',
    label: 'Status',
    render: (status, row) => renderColumnWithApproval(row, status)
  }
]
