import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from 'rebass'
import { Currency } from '@ixswap1/sdk-core'
import dayjs from 'dayjs'

import { ReactComponent as Info } from 'assets/images/info.svg'
import Row, { RowBetween } from 'components/Row'
import { useWindowSize } from 'hooks/useWindowSize'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import { AppDispatch } from 'state'
import { useToggleTransactionModal, useWithdrawModalToggle } from 'state/application/hooks'
import { LogItem, setLogItem } from 'state/eventLog/actions'
import { useWithdrawActionHandlers } from 'state/withdraw/hooks'
import { DesktopAndTablet, DesktopOnly, MEDIA_WIDTHS, TYPE } from 'theme'
import { formatAmount } from 'utils/formatCurrencyAmount'

import { ActionTypeText, getActionStatusText, getStatusColor, ActionTypes, WithdrawStatus } from './enum'
import { DateBox, HistoryRowWraper, IconColumn } from './styleds'

import { ReactComponent as SuccessIcon } from 'assets/images/check-2.svg'
import { ReactComponent as ErrorIcon } from 'assets/images/newCloseIcon.svg'
import { ReactComponent as PendingIcon } from 'assets/images/NewPendingIcon.svg'
import { Line } from 'components/Line'
import { Trans } from '@lingui/macro'

interface Props {
  row: LogItem
  currency: Currency & { originalSymbol: string }
  icon: JSX.Element
}

export const TransactionHistoryRow = ({ row, currency, icon }: Props) => {
  const status = row?.status ?? row?.params?.status ?? 'pending'
  const statusText = getActionStatusText(row.type, status, currency?.originalSymbol, currency?.symbol)
  const { width } = useWindowSize()
  const dateFormat = width && width <= MEDIA_WIDTHS.upToLarge ? 'MMM D, YYYY' : 'MMM D, YYYY HH:mm'
  const formattedDate = dayjs(row.createdAt).format(dateFormat)
  const textColor = getStatusColor(row.type, status)
  const toggle = useToggleTransactionModal()
  const dispatch = useDispatch<AppDispatch>()
  const toggleWithdrawModal = useWithdrawModalToggle()
  const { onTypeAmount, onTypeReceiver } = useWithdrawActionHandlers()

  const amount = useMemo(() => {
    return row.amount
  }, [row])

  const openModal = useCallback(() => {
    dispatch(setLogItem({ logItem: null }))
    if (
      row.type === ActionTypes.WITHDRAW &&
      [WithdrawStatus.DRAFT, WithdrawStatus.FEE_ACCEPTED].includes(row.status as WithdrawStatus)
    ) {
      onTypeAmount(row.amount || '0')
      onTypeReceiver(row.fromAddress || '')
      toggleWithdrawModal()
    } else {
      dispatch(setLogItem({ logItem: row }))
      toggle()
    }
  }, [toggle, dispatch, row, toggleWithdrawModal, onTypeReceiver, onTypeAmount])

  return (
    // <div style={{ borderBottom: '1px solid red' }}>
    <HistoryRowWraper data-testid="row" key={`history-item-${row.createdAt}`} onClick={() => openModal()}>
      <td>
        <TYPE.small>
          <Trans>{ActionTypeText[row.type]}</Trans>
        </TYPE.small>
      </td>
      {amount && (
        <td>
          <TYPE.main1>{`${formatAmount(+amount)} ${currency?.originalSymbol}`}</TYPE.main1>
        </td>
      )}
      <td width="35%">
        <Row>
          <IconColumn>
            <Box marginRight="8px" display="flex" justifyContent="center">
              <IconWrapper size={20}>{icon}</IconWrapper>
              {/* {status === 'approved' ? <SuccessIcon /> : status === 'pending' ? <PendingIcon /> : <ErrorIcon />} */}
            </Box>
          </IconColumn>
          <DesktopOnly>
            <TYPE.main1 color={'#292933'}>{statusText}</TYPE.main1>
          </DesktopOnly>
        </Row>
      </td>
      <td width="25%">
        <RowBetween>
          <DesktopAndTablet>
            <DateBox>
              <TYPE.main1>{formattedDate}</TYPE.main1>
            </DateBox>
          </DesktopAndTablet>
          <Box marginLeft="1rem" display="flex" justifyContent="center">
            <IconWrapper size={20}>
              <Info />
            </IconWrapper>
          </Box>
        </RowBetween>
      </td>
    </HistoryRowWraper>
    // </div>
  )
}
