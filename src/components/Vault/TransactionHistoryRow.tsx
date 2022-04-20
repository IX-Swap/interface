import { Currency } from '@ixswap1/sdk-core'
import { ReactComponent as Info } from 'assets/images/info.svg'
import Row, { RowFixed } from 'components/Row'
import dayjs from 'dayjs'
import { useWindowSize } from 'hooks/useWindowSize'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from 'rebass'
import { AppDispatch } from 'state'
import { useToggleTransactionModal, useWithdrawModalToggle } from 'state/application/hooks'
import { LogItem, setLogItem } from 'state/eventLog/actions'
import { useWithdrawActionHandlers } from 'state/withdraw/hooks'
import { DesktopAndTablet, DesktopOnly, MEDIA_WIDTHS, TYPE } from 'theme'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { ActionHistoryStatus, ActionTypes, ActionTypeText, getActionStatusText, getStatusColor } from './enum'
import { DateBox, HistoryRowWraper, IconColumn } from './styleds'

interface Props {
  row: LogItem
  key: any
  currency: Currency
  icon: () => React.ReactElement
}

export const TransactionHistoryRow = ({ row, key, currency, icon }: Props) => {
  const status = row?.status ?? row?.params?.status ?? ActionHistoryStatus.PENDING
  const statusText = getActionStatusText(row.type, status)
  const { width } = useWindowSize()
  const amount = useMemo(() => {
    return row.amount
  }, [row])
  const dateFormat = width && width <= MEDIA_WIDTHS.upToLarge ? 'MMM D, YYYY' : 'MMM D, YYYY HH:mm'
  const formattedDate = dayjs(row.createdAt).format(dateFormat)
  const textColor = getStatusColor(row.type, status)
  const toggle = useToggleTransactionModal()
  const dispatch = useDispatch<AppDispatch>()
  const toggleWithdrawModal = useWithdrawModalToggle()
  const { onTypeAmount, onTypeReceiver } = useWithdrawActionHandlers()

  const openModal = useCallback(() => {
    if (
      row.type === ActionTypes.WITHDRAW &&
      [ActionHistoryStatus.DRAFT, ActionHistoryStatus.FEE_ACCEPTED].includes(row.status as ActionHistoryStatus)
    ) {
      onTypeAmount(row.amount || '0')
      onTypeReceiver(row.fromAddress || '')
      toggleWithdrawModal()
    } else {
      dispatch(setLogItem({ logItem: row }))
      toggle()
    }
  }, [toggle, dispatch, row])
  return (
    <HistoryRowWraper data-testid="row" key={`history-item-${key}`} onClick={() => openModal()}>
      <td>
        <TYPE.subHeader1 color={'text1'}>{ActionTypeText[row.type]}</TYPE.subHeader1>
      </td>
      {amount && (
        <td>
          <TYPE.subHeader1 color={'text2'}>{`${formatAmount(+amount)} ${
            (currency as any)?.originalSymbol
          }`}</TYPE.subHeader1>
        </td>
      )}
      <td>
        <Row>
          <IconColumn>
            <Box marginRight="8px" display="flex" justifyContent="center">
              <IconWrapper size={20}>{icon()}</IconWrapper>
            </Box>
          </IconColumn>
          <DesktopOnly>
            <TYPE.subHeader1 color={textColor}>{statusText}</TYPE.subHeader1>
          </DesktopOnly>
        </Row>
      </td>
      <td width="25%">
        <RowFixed>
          <DesktopAndTablet>
            <DateBox>
              <TYPE.subHeader1 color={'text1'}>{formattedDate}</TYPE.subHeader1>
            </DateBox>
          </DesktopAndTablet>
          <Box marginLeft="1rem" display="flex" justifyContent="center">
            <IconWrapper size={20}>
              <Info />
            </IconWrapper>
          </Box>
        </RowFixed>
      </td>
    </HistoryRowWraper>
  )
}
