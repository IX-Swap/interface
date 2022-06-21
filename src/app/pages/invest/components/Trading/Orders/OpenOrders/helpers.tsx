import { useTheme } from '@mui/material'
import { useMetamaskConnectionManager } from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'
import { getRoundedPercentage } from 'helpers/numbers'
import {
  ColumnOTCMatch,
  OpenOTCOrder,
  OTCMatch,
  OTCOrderStatus
} from 'types/otcOrder'

export const needsConfirmation = (item: OpenOTCOrder) => {
  return item.orderType === 'SELL'
}

export const getColumnMatchedOrder = (
  row: OpenOTCOrder,
  matched: OTCMatch
): ColumnOTCMatch => {
  return {
    ...matched,
    pair: row.pair,
    createdAt: row.createdAt,
    orderType: row.orderType,
    parentOrder: row._id,
    parentAmount: row.amount
  }
}

export const useOpenOrderState = (
  props: TableViewRendererProps<OpenOTCOrder>
) => {
  const { columns, items, hasActions, loading } = props
  const theme = useTheme()
  const mobileRowColor = (item: OpenOTCOrder) => {
    if (!needsConfirmation(item)) {
      return 'initial'
    }
    return theme.palette.mode === 'light' ? '#F6F4FD' : '#494166'
  }
  const rowColor = (item: OpenOTCOrder) => {
    return theme.palette.mode === 'light' ? '#F6F4FD' : '#494166'
  }
  const columnCount = columns.length + Number(hasActions)
  const { accountState, isWhitelisted } = useMetamaskConnectionManager()
  const { found } = isWhitelisted
  const showEmptyState =
    accountState !== AccountState.SAME_CHAIN ||
    !found ||
    (items?.length === 0 && loading !== true)
  return { showEmptyState, columnCount, mobileRowColor, rowColor }
}

export const sortOpenOrders = (first: OpenOTCOrder, _: OpenOTCOrder) =>
  first?.matches !== undefined &&
  first.matches.length > 0 &&
  first.orderType === 'SELL'
    ? -1
    : 1

export const renderOpenOrderPercentage = (row: OpenOTCOrder) => {
  if (row.orderType === 'SELL') {
    return getRoundedPercentage({
      amount: row.amount,
      matchedAmount: row.amount - row.availableAmount ?? 0
    })
  }
  const statusesWhereToShowFilled = [
    OTCOrderStatus.PENDING,
    OTCOrderStatus.COMPLETED
  ]
  const matchedAmounts = row?.matches
    ?.filter(match => statusesWhereToShowFilled.includes(match.status))
    .map(matched => matched.matchedAmount)
  const matchedAmount =
    matchedAmounts?.reduce(
      (previous, currentAmount) => previous + currentAmount,
      0
    ) ?? 0
  return matchedAmount === 0
    ? '0'
    : getRoundedPercentage({
        amount: row.amount,
        matchedAmount
      })
}
