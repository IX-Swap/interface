import { Typography, IconButton, Tooltip } from '@mui/material'
import { Launch as LaunchIcon } from '@mui/icons-material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { formatDateToMMDDYY } from 'helpers/dates'
import {
  formatMoney,
  //   formatRoundedAmount,
  //   getFilledPercentageFromMatches,
  getOrderCurrency,
  renderTotal
} from 'helpers/numbers'
import { capitalizeFirstLetter } from 'helpers/strings'
import { renderTicker } from 'helpers/tables'
import { useAppTheme } from 'hooks/useAppTheme'
import React from 'react'
import { OpenOTCOrder, OTCOrderStatus } from 'types/otcOrder'
import { TableColumn } from 'types/util'
import { useOTCMarket } from 'app/pages/invest/hooks/useOTCMarket'

const SimpleStatus = ({ status }: { status: string }) => {
  const { theme } = useAppTheme()
  return (
    <Typography
      fontSize={13}
      color={
        status === OTCOrderStatus.CANCELLED
          ? theme.palette.error.main
          : 'initial'
      }
    >
      {capitalizeFirstLetter(status)}
    </Typography>
  )
}

const BlockchainExplorerLink = ({
  status,
  txHash,
  pairId
}: {
  status: string
  txHash: string
  pairId: string
}) => {
  const { data } = useOTCMarket(pairId)

  console.log(data?.otc.dso.network.explorer.urls.transaction)

  return (
    <>
      {status === OTCOrderStatus.COMPLETED && (
        <IconButton
          component={props => (
            <Tooltip title='View on blockchain explorer.'>
              <AppRouterLinkComponent {...props} target='_blank' />
            </Tooltip>
          )}
          size='small'
          to={data?.otc.dso.network.explorer.urls.transaction.replace(
            '%s',
            txHash
          )}
        >
          <LaunchIcon color='disabled' />
        </IconButton>
      )}
    </>
  )
}

export const columns: Array<TableColumn<OpenOTCOrder>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Pair',
    key: 'pair.name',
    render: renderTicker
  },
  {
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
  },
  {
    key: 'price',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },
  {
    key: 'amount',
    label: 'Quantity',
    // render: (value, _) => formatRoundedAmount(value)
    render: (value, _) => value
  },
  {
    key: 'amount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  //   {
  //     key: '_id',
  //     label: 'Filled',
  //       render: (_, row) => getFilledPercentageFromMatches({ row })
  //   },
  {
    key: 'status',
    label: 'Status',
    render: (value, _) => <SimpleStatus status={value} />
  },
  {
    key: 'link',
    label: '',
    render: (_, row) => (
      <BlockchainExplorerLink
        status={row.status}
        txHash={row.status}
        pairId={row.pair._id}
      />
    )
  }
]

export const compactColumns: Array<TableColumn<OpenOTCOrder>> = [
  {
    label: 'Pair',
    key: 'pair.name',
    render: renderTicker
  },
  {
    key: 'status',
    label: 'Status',
    render: (value, _) => <SimpleStatus status={value} />
  },
  {
    key: 'amount',
    label: 'Quantity',
    // render: (value, _) => formatRoundedAmount(value)
    render: (value, _) => value
  },
  {
    key: 'orderType',
    label: 'Side',
    render: value => capitalizeFirstLetter(value)
  },
  {
    key: 'price',
    label: 'Price',
    render: (value, row) => formatMoney(value, getOrderCurrency(row), false)
  },

  {
    key: 'amount',
    label: 'Total',
    render: (_, row) =>
      renderTotal({ amount: row.amount, price: row.price, row })
  },
  //   {
  //     key: '_id',
  //     label: 'Filled',
  //     render: (_, row) => getFilledPercentageFromMatches({ row })
  //   },
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  }
]
