import { useTheme } from '@mui/material'
import { useMetamaskConnectionManager } from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'
import { OTCOrder, OTCOrderStatus } from 'types/otcOrder'

export const needsConfirmation = (item: OTCOrder) => {
  return (
    item.matches?.status === OTCOrderStatus.CONFIRMED &&
    item.orderType === 'SELL'
  )
}

export const useOpenOrderState = (props: TableViewRendererProps<OTCOrder>) => {
  const { columns, items, hasActions, loading } = props
  const theme = useTheme()
  const rowColor = (item: OTCOrder) => {
    if (!needsConfirmation(item)) {
      return 'initial'
    }
    return theme.palette.mode === 'light' ? '#F6F4FD' : '#494166'
  }
  const columnCount = columns.length + Number(hasActions)
  const { accountState, isWhitelisted } = useMetamaskConnectionManager()
  const { found } = isWhitelisted
  const showEmptyState =
    accountState !== AccountState.SAME_CHAIN ||
    !found ||
    (items?.length === 0 && loading !== true)
  return { showEmptyState, columnCount, rowColor }
}

export const sortOpenOrders = (first: OTCOrder, _: OTCOrder) =>
  first.matches?.status === OTCOrderStatus.CONFIRMED ? -1 : 1
